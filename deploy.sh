#!/bin/bash

REPOSITORY=/home/ubuntu/blog
REPOSITORY_PROD=/home/ubuntu/blog

echo "DEPLOYMENT_GROUP_NAME: ${DEPLOYMENT_GROUP_NAME}"

sudo su 
cd /home/ubuntu/blog 
chmod +x ./deploy.sh 
npm -v 
npm install next@latest 
pm2 delete blog 
pm2 start "npx next start" --name blog 

