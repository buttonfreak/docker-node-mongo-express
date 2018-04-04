FROM node:8-slim

WORKDIR /app
ENV NODE_ENV production

COPY ./api/package.json /app/package.json

RUN npm install --quiet

COPY . /app

CMD ["npm","start"]

EXPOSE 3000
