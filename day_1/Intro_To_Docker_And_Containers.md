# Intro To Docker And Containers.


## What is a container? :package: 

A container is a very small, lightweight self-contained **operating system** which runs on a host machine like a laptop or server. **A container runs an entire operating system, like Linux** - but usually they're running reduced versions of whole operating systems.


## What is Docker? :whale:

Docker is a proprietary software platform that can be installed on severs and development machines to allow us to run containers. Docker isn't the only company providing softare for running containers.

## What is an image :cd: ?

An image is a pre-built package of all of the files that make up a container. In many cases this is *just enough* of the files in an operating system to perform an application specific task. A container is a portable artifact, easily shared and moved around.
> :cool: Fact -  An image is just a zip file of all the contents of an operating system.


> :thinking: Think of an image as being like a CD-ROM or DVD that you put into your computer to run some application - just like in the old days. Images, like CD-ROM's and DVD's are *read-only*




## Where do images come from + how do we use them? :baby:

Some companies may have private repositories for image.
There is also a public repository for conatiners called DockerHub. Here you will likely be able to find any container you might need.

https://hub.docker.com/

Here you will find official and unoffical images for most applications.

> :warning: let's take a look at what images are available for running containers on Docker Hub

### What kind of things can we do with containers?

>> :clock: Spend a few mins looking around docker hub and get students to share what they've found

Eg:
* Redis - redis is a cache + Db
* Mongo - we know MongoDB is a document based database
* WordPress - many times bigger than a simple database - WordPress is the most well known CMS in the world
* Ubuntu - most popular user friendly linux os

Generally, there's a container for every programming language, database, project, tool etc etc.. Particularly if that is open sourced.

## How do we use containers?

There are many ways to use containers, but the simplest is to use Docker to run a container on your development machine. Docker is a command line based application that allows us to run containers. 

We can run any container mentioned on Docker Hub by simply doing `docker run <image-name>`
For example:
`docker run mongo:latest` - this one command will do all of the following for us
* Download the latest MongoDB **image** :cd: 
* Launch the image :rocket: (like putting the disk into the drive)
* Run the contents of the image :runner: - this is when it becomes a container.



> Docker is highly optimized! If we stop that container with `ctrl+c` - then run the same command again, it will run many times faster than it did the first time.
> :question: **Why do you think that is?**:question:


Docker doesn't need to download images twice.




### Why use containers?

Running containers have two seprate benefits depending on what you're doing with them:

* **Developer productivity** - In other words we use them locally to make our lives easier for some things.
* **Infrastructure resilliancy and reusability** - We run them on servers because it's more re-usable and resilliant and cost-effective to do so.

> You will find out: That these two separate benefits have a lot of double cross-over.

---


Prior to the use of containers, setting up someone else's development app on your machine could be a tedious and fraught experience. You would need to install binaries of all the required dependencies at the correct version. If you are using a different OS, the installation process could be different. This creates lots of opportunities for mistakes and errors.

When using containers you do not need to install any of the dependencies directly on your operating system because the container is its own isolated operating system layer with Linux based image. So you have everything in one isolated OS environment, packaged with all needed configuration.

Similar improvements in efficiency can be gained when it comes to deployment. Rather than manually installing any required dependencies and manually configuring environents on the deployment server, we can simply install a container (assuming you have installed docker runtime).


**Remember**
A docker **image** is the actual package. This would include all the configuration, the application itself and and a start script. This is the moveable artifact that can be used of different computers and servers.

A **container** is what we get when we pull the image and start it on our computer (or a server, etc). Running the **image** creates a **container** on our computer.


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



[<img src="./images/Screenshot%202022-10-24%20at%2015.00.26.png" width="250"/>](./images/Screenshot%202022-10-24%20at%2015.00.26.png)


The docker images we download or create contain only the applications layer and are usually sized in mb. Virtual Machines on the other hand contain the applications layer and the kernel layer. As a result they are often sized in the gb.


> :dollar: This means that running applications on containers is **many times** more efficient than running them *directly* on VM's. (VM's are still very much used, but not to run applications directly, instead they're used to manage virtualised infrastructure at the data center level)

[<img src="./images/Screenshot%202022-10-24%20at%2015.09.29.png" width="300"/>](./images/Screenshot%202022-10-24%20at%2015.09.29.png)



# Summary

* Containers are entire OS's that run on a host of your choice
* An image is a pre-built package of all of the files that make up a container
* Docker is software for running containers
* When we run a container we give it the name of the image eg `docker run postgres` - finds and runs the postgres image
* Docker looks for images in their public registry **Docker Hub**
* Containers are sigificantly more efficent than running applications on Virtual Machines





