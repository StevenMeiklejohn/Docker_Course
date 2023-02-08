## Docker File


### Intro
Let's consider the following scenario;
We have developed our application or application feature, we've tested it and now we are ready to deploy it.
What we will do next is generate a docker image. We will be stepping through the process usually automated by jenkins (taking our built js app which we have pushed to github and creating a docker image)

### Server app

**
*For the moment we will be focusing on the server side of our application, we will repeat the process for our react app later.*
As such ensure yiou are inside the server folder of the start point.
**

![](code/Docker_File/Screenshot%202023-01-25%20at%2013.45.41.png)


To do this we will need a blueprint for building images. Otherwise known as a docker file.

This file must be named 'Dockerfile' (no file extension)
```
Dockerfile

FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password


RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "/home/app/server.js"]
```

Lets go through these commands;

The FROM line is the image we will be using as a base for our image. Our server.js runs using node, so our image will be built upon the node base image.

The ENV lines are optional. We can use them to overwrite the env variables in the yaml, or omit them entirely.

The RUN line is a command that will run INSIDE the container.So the folder specified here will be created inside the container.

The COPY line runs LOCALLY and as such will copy the contents of the current directory to the folder specified. (Copy our project directory to /home/app)

The CMD line defines the entry point to the application. The command required to start our app is "node server.js"


Now that we have our blueprint, lets build our image file.
we need to provide two pieces of information to the docker build command.
1. The name of our image and a tag.
2. The location of the Dockerfile

```
docker build -t my_app:1.0 .
```

We can check docker images using
```
docker images
```

We should see our image listed.
```
REPOSITORY      TAG       IMAGE ID       CREATED              SIZE
my_app          1.0       260f4ba98dad   About a minute ago   115MB
mongo           latest    b70536aeb250   3 months ago         695MB
mongo-express   latest    2d2fb2cabc8f   15 months ago        136MB
```

We have just simulated what Jenkins would normally do in a typical CI pipeline.
Usually we would push our app to github with the Dockerfile included and Jenkins would take care of actually creating the image.

Lets create a container using the new image;
Since our app inside the container listens on port 9000, lets map that to port 9001 on our local machine
```
docker run -p 9001:9000 my_app:1.0
```

You should see your container running
```
➜  server git:(main) ✗ docker run my_app:1.0
Listening on port 9000
```

So, our web app (server.js) is running on container port 9000, which we have mapped to port 9001 on our local machines. However, if we navigate to localhost://9001 we are faced with a cannot get error.
So what's going on here?
Two issues, 
1. Our web app is not currently on the same network as the mongodb and gui.
2. Our connection string in the server.js does not work.

We can remedy the first issue by going back to out docker-compose file and adding our web app.
```
mongo.yaml

  app:
    container_name: docker-mongo-server
    restart: always
    build: .
    ports:
      - '9000:9000'
    depends_on:
      mongodb:
        condition: service_healthy
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongodb
```

Here we have specified a port that the web app will use on the internal network, allowing it to communicate with the db. We also specified that the web app requires the mongodb.
We also set the - ME_CONFIG_MONGODB_SERVER=mongodb environment variable.
This will allow us to fix the connection string issue in the server.js


```
const mongo_server = process.env.ME_CONFIG_MONGODB_SERVER


MongoClient.connect(`mongodb://admin:password@${mongo_server}:27017`, { useNewUrlParser: true, useUnifiedTopology: true })
.then((client) => {
  console.log('client', client);
  const db = client.db('games_hub');
  const gamesCollection = db.collection('games');
  console.log('gamesCollection', gamesCollection);
  const gamesRouter = createRouter(gamesCollection);
  app.use('/api/games', gamesRouter);

})
.catch(console.error);
```




