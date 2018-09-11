FROM node:8
MAINTAINER Richi

WORKDIR /usr/src/app

COPY package*.json ./
RUN mkdir /usr/src/app/public

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "build" ]
CMD [ "npm", "start" ]
# docker build --no-cache -t richi/abraxas .
# docker run -e APP=Abraxas -e PORT=8080 -e BACKEND_SERVER=http://localhost:8080 -e NODE_ENV=production -it -p 8080:8080 -d richi/abraxas

# docker exec -it <id> /bin/bash
# docker-machine ip id