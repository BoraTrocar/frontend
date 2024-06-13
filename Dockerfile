FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME [ "/var/cache/nginx" ]
COPY --from=angular app/dist/bora-trocar-v2 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
