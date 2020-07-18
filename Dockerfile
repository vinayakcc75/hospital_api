FROM node:12-alpine

RUN mkdir -p /BackEnd
WORKDIR /BackEnd
COPY package.json /BackEnd
COPY package-lock.json /BackEnd
RUN npm install
COPY . /BackEnd
CMD ["node", "index.js"] 
#sudo docker run -it --rm busybox