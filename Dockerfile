FROM node:14.1.0-alpine as build

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY src src

RUN npm install;

RUN npm run build

FROM node:14.1.0-alpine as prod

WORKDIR /app

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm i nodemon -g; \
    fi;

RUN npm install;

COPY --from=build /app/dist/ dist/

ENV PORT 8080

ARG PG_USER
ENV POSTGRES_USER=$PG_USER

ARG PG_HOST
ENV POSTGRES_HOST=$PG_HOST

ARG PG_DB
ENV POSTGRES_DATABASE=$PG_DB

ARG PG_PASSWORD
ENV POSTGRES_PASSWORD=$PG_PASSWORD

EXPOSE 8080

CMD npm start