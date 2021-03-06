#!/bin/bash

GREEN_TEXT_COLOR='\033[0;32m'
NC='\033[0m' # No Color

# Install client dependencies

cd ./client

# cp environment variables file
cp .env.example ./.env

# install
npm install

# end client instalation
cd ../
echo -e "${GREEN_TEXT_COLOR}Client dependencies Successfuly installed${NC}"

# Install server dependencies

cd ./server

# cp environment variables file
cp .env.example ./.env

# install
npm install

# end client instalation
cd ../
echo -e "${GREEN_TEXT_COLOR}Server dependencies Successfuly installed${NC}"


