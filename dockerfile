#FROM ubuntu:latest
FROM node:16

WORKDIR /home/co2-admin-panel
# Creating folders, and files for a project:
COPY . .

RUN apt update
#RUN apt install curl -y
#RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
#RUN sudo apt-get install nodejs
#RUN node -v
#RUN apt install nodejs -y # installing node 12 need to install node 16
#RUN apt install npm -y

#RUN npm install --global yarn

RUN yarn install
