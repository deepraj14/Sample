### Please visit the deployed project [here](http://146.190.236.16:3000/)

# IDE

This is an Online IDE platform, currently supporting 4 Languages :

- C++
- Java
- Python
- NodeJS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- docker
- docker-compose

### Installation

1. Clone the repo

```sh
git clone https://github.com/vmbansal2001/CodeG-IDE
```

2. Run in the cloned directory

```sh
docker-compose up --build
```

3. This will start 5 services (client,server,worker,reddis-server and a rabbitMQ instance).
   The client will be listening on 3000 PORT.

## Built With

- React JS - Used for Frontend
- ExpressJS - Used for Backend
- RabbitMQ - Task queue for Managing requests
- Redis - Used for caching the results
- Nodejs - Used as the js runtime
