## Developing With Containers.

Now that we understand the concept of containers and how to use them locally, let's look at a (slightly simplified) continuous integration process that is representative of what we might find in industry.

![](images/Screenshot%202022-10-26%20at%2016.10.48.png)

Lets say we've built a react front end on our laptop which will connect to a mongodb. Instead of installing mongodb, we'll pull the image from the dockerhub public repo and use a container instead.
Once initial development on our app is complete and we to deploy our app, perhaps to a development server for testing, or possibly so that others can look at or use it.
We will push our JS application to git which will trigger a Jenkins build (Continuous integration). Jenkins will build our JS app and create a docker image which we can push to a private (or public) repo of docker hub.
Now when our tester (or soon to be impressed friend or colleague) wants to install our app, they simply run our app container from the private repo in conjuction with the mongodb container container from the public repo.
No setup or configuration or required!

Any time we make a change to the code of our app, we push the code to git, which in turn creates a new docker image and pushes it to the repo. We are continuously integrating updates to our code app into our deployed app.


## Using Docker in a Local Development Process

Looking at our start code you can see we have a front end react app and a backend express server. We are going to provide a mongodb that our backend server can connect to using a docker container.
In addition, we will provide mongo UI which we can use to easily view the contents of our db.

[<img src="./images/Screenshot%202022-10-27%20at%2010.53.20.png" width="250"/>](./images/Screenshot%202022-10-27%20at%2010.53.20.png)

First off, lets pull the official mongo image from dockerhub.
```
docker pull mongo
```
Next, lets pull docker-express (this will be our mongodb GUI)
```
docker pull mongo-express
```

Before starting the containers, we are going to create an isolated docker network which our mongodb and mongo express UI will use to communicate.
if we type;
```
docker network ls
```
You should see something like this;
```
NETWORK ID     NAME      DRIVER    SCOPE
cf985ea4d977   bridge    bridge    local
ca75c5ed856c   host      host      local
62230526f22e   none      null      local
```
we will create our own docker network called mongo-network by typing;
```
docker network create mongo-network
```
Now if we check our list of networks we should see our new network.
```
NETWORK ID     NAME             DRIVER    SCOPE
cf985ea4d977   bridge           bridge    local
cc772cdcc1ed   mongo-network   bridge    local
ca75c5ed856c   host             host      local
62230526f22e   none             null      local
```

In order to make our mongodb and mongo-express containers run on this network we need to include the network command when we start the container.

```
docker run -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo
```
Here's what each of these flags are for;

![](images/Screenshot%202022-11-05%20at%2014.19.40.png)

If successful you should see a long id number in the terminal. To look at the container log;

```
docker logs <id>
```
All being well you should see something along the lines of;
```
{"t":{"$date":"2022-11-05T14:42:47.158+00:00"},"s":"I",  "c":"NETWORK",  "id":23015,   "ctx":"listener","msg":"Listening on","attr":{"address":"/tmp/mongodb-27017.sock"}}
{"t":{"$date":"2022-11-05T14:42:47.158+00:00"},"s":"I",  "c":"NETWORK",  "id":23015,   "ctx":"listener","msg":"Listening on","attr":{"address":"0.0.0.0"}}
{"t":{"$date":"2022-11-05T14:42:47.158+00:00"},"s":"I",  "c":"NETWORK",  "id":23016,   "ctx":"listener","msg":"Waiting for connections","attr":{"port":27017,"ssl":"off"}}
```
As you can see, the container is awaiting connections on port 27017.

Next we want to run the mongo-express which should connect to the mongodb container on start up.

```
docker run -d \
> -p 8081:8081 \
> -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
> -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
> --net mongo-network \
> --name mongo-express \
> -e ME_CONFIG_MONGODB_SERVER=mongodb \
> mongo-express
```
Lets go through the meaning of those commands;

![](Screenshot%202022-11-05%20at%2015.37.26.png)

if we check the logs of the new container, you should see;
```
Mongo Express server listening at http://0.0.0.0:8081
```
In the browser, navigate to http://localhost:8081/ and you should see the mongo-express GUI. From here we can create a new database.

![](images/Screenshot%202022-11-05%20at%2015.43.52.png)

Create a db called 'games_hub'
Inside this db create a collection called 'games'.
Next we can add a document for each of our games. For example;
```
{
    "_id": ObjectID(),
    name: "Resistance",
    playingTime: 30,
    players: {
      min: 5,
      max: 10
    }
}
```


Lets connect our backend server to the database.
```
server.js

MongoClient.connect('mongodb://localhost:27017/games_hub', { useUnifiedTopology: true })
.then((client) => {
  const db = client.db('games_hub');
  const gamesCollection = db.collection('games');
  const gamesRouter = createRouter(gamesCollection);
  app.use('/api/games', gamesRouter);

})
.catch(console.error);
```

Our games app should now be wired up such that we can see the existing games listed on the home page as well as being able to post new games!




