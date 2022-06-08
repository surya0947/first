FROM node:latest AS js_build
COPY . /webapp
WORKDIR webapp
RUN npm install && npm run build

FROM docker.io/madhukirans/idpapiserver:1 AS go_build

FROM alpine:latest
WORKDIR /idpwebapp
COPY --from=js_build /webapp/build* ./build/
COPY --from=go_build /go/bin/main ./main
EXPOSE 8080
ENTRYPOINT ["/idpwebapp/main"]
