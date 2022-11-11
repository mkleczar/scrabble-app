FROM nginx:alpine
COPY /dist/scrabble-app /usr/share/nginx/html
EXPOSE 80
