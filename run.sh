#!/bin/bash

# Run this script in root directory

# run server
cd ./server
nodemon app.js
echo "Server Running"

# Run client
cd ../client
npm start
echo "Client Running"