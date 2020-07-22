FROM node:12-alpine

RUN mkdir -p /hospital_api
WORKDIR /hospital_api
COPY package.json /hospital_api
COPY package-lock.json /hospital_api
RUN npm install
COPY . /hospital_api
CMD ["node","index.js"] 
#sudo docker run -it --rm busybox