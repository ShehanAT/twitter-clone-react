# pull official base image
FROM node:alpine3.15 

# set working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY /server/package.json ./
COPY /server/package-lock.json ./

RUN npm install -force --production

# add app
COPY . ./

EXPOSE 8080

# start app
CMD ["npm", "start"]