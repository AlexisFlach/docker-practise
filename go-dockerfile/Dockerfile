FROM golang:alpine AS builder

WORKDIR /go/src/app/
COPY main.go /go/src/app
RUN go mod init 
RUN go build -o webserver .

FROM alpine
WORKDIR /app/
COPY --from=builder /go/src/app/ ./
CMD ["./webserver"]

