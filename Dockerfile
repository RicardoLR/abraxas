FROM node
MAINTAINER Richi

WORKDIR /usr/src/app

COPY package*.json ./
RUN mkdir /usr/src/app/public

RUN npm install

# Bundle app source
COPY . .

ENV PORT 8082

EXPOSE 8082
#CMD [ "npm", "run build"]
#CMD [ "npm", "start" ]
CMD ["npm","run", "prepare"]

# docker build --no-cache -t richi/abraxas .
# docker run -e APP=Abraxas -e PORT=8082 -e BACKEND_SERVER=http://localhost:8082 -e NODE_ENV=production -it -p 8082:8082 -d richi/abraxas

# docker exec -it <id> /bin/bash
# docker-machine ip id