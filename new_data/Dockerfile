FROM ashrafuzzaman/node:6-alpine

RUN mkdir /code
WORKDIR /code

# Needed for node-gyp
RUN apk add --no-cache python
RUN npm install -g node-gyp

ADD package.json /code
RUN npm install

ADD . /code/

CMD [npm start]
