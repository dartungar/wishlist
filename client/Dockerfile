# build
FROM node:15.2.0 as build_stage
WORKDIR /client
COPY . . 
RUN npm install
RUN npm run build

# only use built app
FROM nginx:1.19.4
COPY --from=build_stage /client/build/ /usr/share/nginx/html
COPY --from=build_stage /client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443