#!/bin/bash

set -o errexit

apt-get -q update
apt-get install -y cowsay
# installing node enviroment
apt-get install -y nodejs
apt-get install -y npm

npm cache clean -f
npm install -g n
n stable

/usr/games/cowsay "Install dependencies using a script like this!"
