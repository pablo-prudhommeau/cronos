FROM alpine:3.10.3

RUN apk update && apk add --no-cache supervisor openjdk11-jre nginx nodejs npm

COPY backend/build /app/backend/
COPY frontend/dist/cronos/ /app/frontend/

COPY nginx-default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
RUN mkdir -p /run/nginx

COPY supervisord.conf /etc/supervisord.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

ENV NODE_ENV=production

EXPOSE 80
