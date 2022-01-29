# pull official base image
FROM node:alpine3.15 

# set working directory
WORKDIR /client 

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY /client/package.json ./
COPY /client/package-lock.json ./


RUN npm install --force --production 

# add app
COPY . ./



EXPOSE 3000

# start app
CMD ["npm", "start"]