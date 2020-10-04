FROM node:14.1.0

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm i nodemon -g; \
    npm install; \
    else npm install --only=production; \
    fi;

COPY . .

RUN npm run build;

EXPOSE 3000

CMD ["npm start"]