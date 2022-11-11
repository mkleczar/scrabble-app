#FROM nginx:alpine
#COPY /dist/scrabble-app /usr/share/nginx/html
#EXPOSE 80


FROM node:16.13.1-alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
