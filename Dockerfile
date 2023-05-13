FROM node:14-alpine
WORKDIR /frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
