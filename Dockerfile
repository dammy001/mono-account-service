FROM node:17-alpine AS development
WORKDIR /app
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY  . ./

# build stage
FROM development as build-stage
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start:prod"]

# production stage
# FROM nginx:1.21.4-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d
# EXPOSE 30
# CMD ["nginx", "-g", "daemon off;"]
