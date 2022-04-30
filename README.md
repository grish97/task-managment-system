# Task Managment System

Task Managment System project includes **authentication & authorization part and task managment functionality**

## Project structure

> ### client
>> React Typescript Application

> ### server
>> NodeJS Application

## Used technologies

> ### **Server side**

- NodeJS
- Express
- JWT
- MongoDB (Mongoose)

> ### **Client Side**

- React Typescript (V18)
- React Router DOM (V6)
- Redux
- React Bootstrap
- SCSS

## Run Client 

Make this commands from ***root directory*** of the project

```bash
# change directory to client
cd ./client

# copy example of environment variables file
# and update values
cp .env.example ./.env

# install all dependencies
npm install

# start project in development mode (PORT: 3000)
npm start
```

## Run Server

Make this commands from ***root directory*** of the project

```bash
# change directory to server
cd ./server

# copy example of environment variables file
# and update values
cp .env.example ./.env

# install all dependencies
npm install

# start project in development mode (PORT: 8000)
nodemon app.js
```

## Database

Required **MongoDB** client in computer

> Default running port is **27017**

> Local client url **mongodb://localhost:27017**

## Aditional information

>On the User model created default user which role is admin
>> Email: ***admin@admin.com***<br>
>> Password: ***admin0000***
