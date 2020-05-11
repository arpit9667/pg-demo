FROM node:10

WORKDIR /pg-demo

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD npm run dev