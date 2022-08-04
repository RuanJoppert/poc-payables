FROM golang:1.18.1 as builder
RUN go install -trimpath go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --output /k6 --with github.com/grafana/xk6-sql --with github.com/mostafa/xk6-kafka

FROM grafana/k6:latest
COPY --from=builder /k6 /usr/bin/k6
