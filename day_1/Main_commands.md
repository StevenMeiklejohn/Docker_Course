## Main Commands And Ports

Next we will look at some of the most common commands employed when handling images/containers.

Remember that all of the packages we pull or download from dockerhub are images. They don't become containers until they are running on our computer.

## Main Commands


To view all the images currently on your computer;
```
docker images
```

To start one of the images;

(Pulls the image if neccessary then runs it)
```
docker run <image_name>
```

To list the running containers;
```
docker ps
```
To run in detached mode;

(Command line remains free and container id is displayed)
```
docker run -d <image_name>
```

To stop a crashed container;
```
docker stop <container_id>
```

To re-start;
```
docker start <container_id>
```

To list running and stopped containers;
```
docker ps -a
```

## Ports and Port Binding

Lets discuss how ports and binding works in docker.
Lets suppose we have two containers, both running different versions of the same application
Note: Not neccessary to code along here;

Pull and run the first version;
```
docker run redis:7.0.5
```

In another shell, pull and run the second version.
```
docker run redis:6.2.7
```

If we run;

```
docker ps
```

You will see that the two containers are running on the same port.

![](./images/Screenshot%202022-10-25%20at%2015.12.05.png)

This is the port that the container is listening for incoming requests on. (The port being used was specified in the image).
Two different containers running on the same port is perfectly acceptable as long as we bind them to different port numbers on the host machine.
(Remember, each container is effectively its own operating system, so each has its own port 6379).



[<img src="./images/Screenshot%202022-10-25%20at%2015.34.48.png" width="250"/>](./images/Screenshot%202022-10-25%20at%2015.34.48.png)

So, in this example, we could have an app running on **localhost:5000** and this app would know how to communicate with the relevant container on port 6379, while another app running on ** localhost:5001** would know how to communicate with the other container running on 6379.

With that said, how to we bind a host port to our container?
First, stop the containers;
```
docker stop <id>
docker stop <id>
```
Next start the container using the binding ports;
```
docker run -p6000:6379 redis:6.2.7
docker run -p5001:6379 redis:7.0.5
```

You will see that we have successfully binded our ports

![](./images/Screenshot%202022-10-25%20at%2016.07.40.png)

In the first instance, port 5001 of my laptop has been bound to port 6379 of the container running redis ver 7.0.5.


## Debugging Containers

In the previous lesson we saw how to user basic docker commands run containers, stop them, list them and assign them to a port, etc.
Lets look at some ways of debugging containers which aren't working correctly.

We can the output logs of a container easily by running;
```
docker logs <container_id>
```
or
```
docker logs <container_name>
```
You may have noticed that starting up a container assigns it a random (and often pretty bizarre) name. You can actually assign your own name to the container which could be useful for identification if you are running lots of containers.
```
docker run --name <your name> <image name>
```

A very useful debugging tool is the ability to access the container's terminal. This would allow to navigate to a folder in the container, check a log file, check a config file or perhaps print out environment variables.
to do this we use the docker **interactive terminal**
```
docker exec -it <container name or id> /bin/bash
```
From here we can use the usual terminal commands (ls, pwd, etc) inside our container.
Type **exit** to come out of the container's terminal.















