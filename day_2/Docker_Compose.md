## Docker Compose

In the previous lesson we started up 2 docker containers.
Mongo-express and mongodb. We did so by starting each container indivually with the appropriate commands.
As you might imagine, if we had numerous containers, the start up process could be time consuming and tedious. It would be great if we had the ability to automate the process.

Docker Compose to the rescue!

Docker compose is a yaml file in which we can map our docker commands for several containers and essentially script the whole start up process.

For example, here's how we would script the start up of our mongodb container.
Create a file called mongo.yaml in your project folder;

```
version: '3'
services:
  mongodb:
    image: mongo
    restart: always
    ports:
      - 27018:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
  
  mongo-express:
    image: mongo-express
    ports:
      - 8080:8081
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_SERVER=mongodb
```
*Note. Indentation is very important.*

Here we have our two containers with each containers configuration indented below.
Having our docker commands in a file like this makes it much easier to modify (changing the admin password for example)

Take note of the change made to the mongodb port. We are now telling the host post (our computer) to connect to the mongodb container via port 27018. This is then connected to port 27017 inside the container.
This will prevent any confusion between our containerised mongodb and the version running natively on our computer. 

This means we need to update our server.js to connect to port 27018
```
MongoClient.connect('mongodb://admin:password@localhost:27018', { useNewUrlParser: true, useUnifiedTopology: true })
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



You may have noticed that we haven't mentioned our container network in the yaml files.
This is because docker compose will handle setting up the network for us!

So, how do we actually use this file?
We'll be using the docker-compose command which should have been installed at the same time as docker.

First of all, lets check there are no containers currently running.
```
docker ps
```

We should see;
```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

To run our containers using the yaml file;
```
docker-compose -f mongo.yaml up
```

and voila! Our containers should be running.
```
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS         PORTS                      NAMES
b339cf2b1d7e   mongo-express   "tini -- /docker-ent…"   38 minutes ago   Up 3 minutes   0.0.0.0:8080->8081/tcp     docker_compose_end-mongo-express-1
23f9d353491d   mongo           "docker-entrypoint.s…"   38 minutes ago   Up 3 minutes   0.0.0.0:27017->27017/tcp   docker_compose_end-mongodb-1
```

You should see something like this;
```
[+] Running 3/3
 ⠿ Network docker_compose_end_default            Created                                                          0.0s
 ⠿ Container docker_compose_end-mongodb-1        Created                                                          0.1s
 ⠿ Container docker_compose_end-mongo-express-1  Created                                                          0.1s
 ```



We can check if docker-compose has setup our network;
```
docker network ls
```

```
NETWORK ID     NAME                         DRIVER    SCOPE
7b8bdfe67c46   bridge                       bridge    local
afbe6c1ab033   docker_compose_end_default   bridge    local
ca75c5ed856c   host                         host      local
62230526f22e   none                         null      local
```

In my case, docker-compose has created a network called 'docker_compose_end_default'.
Yours may vary depending on your folder project name.


Now that our containers are running, we can check the mongodb gui in the browser on localhost:8081.
You will notice that our database and collections no longer exist. This is because when we close the containers the data stored on the db container is lost.
Most inconvenient. We will however remedy this later using 'volumes'.

Lets check that our server.js is working. As we saw previously, the server app should be serving up a json of all the games at 
```
http://localhost:9000/api/games
```

In the server folder, run the server;
```
node run server:dev
```
If we navigate to http://localhost:9000/api/games we should see the games json.


One final thing, you might be wondering 
"how do we shut these containers down?"
Docker-compose makes this easy too.
We simply enter the command
```
docker-compose -f mongo.yaml down
```
All of our containers should be shut down.

```
[+] Running 3/3
 ⠿ Container docker_compose_end-mongo-express-1  Removed                                                          0.0s
 ⠿ Container docker_compose_end-mongodb-1        Removed                                                          0.0s
 ⠿ Network docker_compose_end_default            Removed                                                          0.1s
 ```


 Next, we will build our own docker image!









