FROM node:4-slim

RUN mkdir /code
WORKDIR /code

# Needed for node-gyp
RUN apt-get update && \
    apt-get install -y python make g++ && \
    apt-get -y clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g node-gyp

ADD package.json /code
RUN npm install

ADD . /code/

CMD [npm start]
