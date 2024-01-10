#### Stage 1 #####
FROM node:16-alpine as builder

WORKDIR /client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

#### Stage 2 #####
FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder  /client/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]