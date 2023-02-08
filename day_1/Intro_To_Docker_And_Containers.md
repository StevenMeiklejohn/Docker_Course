## Intro To Docker And Containers.


### Intro

A container is a way to package an application along with all the relevant dependencies and configurations.
A container is a portable artifact, easily shared and moved around.
A container makes development and deployment more efficient.

Given that a container is portable, we need to think about where any given container might live. All containers reside in a container repository. 

[<img src="./images/Screenshot%202022-10-24%20at%2010.09.42.png" width="250"/>](./images/Screenshot%202022-10-24%20at%2010.09.42.png)


Some companies may have private repositories for containers.
There is also a public repository for conatiners called DockerHub. Here you will likely be able to find any container you might need.

https://hub.docker.com/

Here you will find official and unoffical images for most applications.



### Why use containers?

Prior to the use of containers, setting up someone else's development app on your machine could be a tedious and fraught experience. You would need to install binaries of all the required dependencies at the correct version. If you are using a different OS, the installation process could be different. This creates lots of opportunities for mistakes and errors.

When using containers you do not need to install any of the dependencies directly on your operating system because the container is its own isolated operating system layer with Linux based image. So you have everything in one isolated OS environment, packaged with all needed configuration.

Similar improvements in efficiency can be gained when it comes to deployment. Rather than manually installing any required dependencies and manually configuring environents on the deployment server, we can simply install a container (assuming you have installed docker runtime).

### What is a container?

Containers are made up of layers of 'images'. The layers usually have a Linux base layer to keep the size as small as possible.
(Alpine is a cut down, light-weight version of Linux)
On top of this are a number of intermediate layers. these increase reusability, decrease disk usage, and speed up docker build by allowing each step to be cached and are not usually shown.
The application image layer then goes on top.


[<img src="./images/Screenshot%202022-10-24%20at%2011.22.00.png" width="350"/>](./images/Screenshot%202022-10-24%20at%2011.22.00.png)


## Using a container.

Ok, so lets look at how we might actually use a container from the public repository.

**Download the docker desktop application**

Lets say we want a container to give us postgres.
Go to the docker hub and search for postgres.
You will see that we can specify which version of postgres we would like or use;

```
docker run postgres
```
This will pull and start the postgres container using the latest version.


At this point it is important to distinguish between what we mean by **image** and **container**.

A docker **image** is the actual package. This would include all the configuration, the application itself and and a start script. This is the moveable artifact that can be used of different computers and servers.

A docker **container** is what we get when we pull the image and start it on our computer (or a server, etc). Running the **image** creates a **container** on our computer.


We can see which containers are currently running on our system either by checking the docker desktop app;

![](Screenshot%202022-10-24%20at%2014.39.00.png)

or by runnning

```
docker ps
```

in terminal.

It is worth noting that if I wanted to run another version of postgres simultaneously on my system, I would simply pull the relevant version container from dockerhub and I could run both without any conflicts.





### Docker Vs Virtual Machine.

What we have described so far might sound a lot like a virtual machine, but there are some key differences. To understand them we first need to consider operating systems.
Essentially, operating systems have two layers. The kernel layer and the applications layer.

The kernel layer is responsible for interacting with the hardware (memory, cpu, etc) while the applications layer on top runs the applications. Applications use the kernel layer to access the hardware as needed.


[<img src="./images/Screenshot%202022-10-24%20at%2015.00.26.png" width="250"/>](./images/Screenshot%202022-10-24%20at%2015.00.26.png)


The docker images we download or create contain only the applications layer and are usually sized in mb. Virtual Machines on the other hand contain the applications layer and the kernel layer. As a result they are often sized in the gb.


[<img src="./images/Screenshot%202022-10-24%20at%2015.09.29.png" width="300"/>](./images/Screenshot%202022-10-24%20at%2015.09.29.png)


A virtual machine therefore, can be ran on a computer using any operating system, while a docker container would ideally run on a machine with a matching operating system. (Running docker natively).

Newer versions of OSs have gone some way to improve the situation 

(Mac OS version 10 and above run docker natively) 

and it can be overcome entirely by using intermediate software like **Docker Toolbox** which abstracts away the kernel. None-the-less, the difference is something to be aware of.







