FROM node:18-bullseye AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN rm -rf node_modules && yarn install --force

COPY . .
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]