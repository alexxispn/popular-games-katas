FROM node:16.17.0-alpine3.15 as build
WORKDIR app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine
COPY --from=build /app/dist/wordle-practice /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
