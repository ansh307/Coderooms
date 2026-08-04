const client = require("prom-client");

// Default Node.js metrics
client.collectDefaultMetrics();

// HTTP Request Counter
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"],
});

// HTTP Request Duration
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Request Duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

module.exports = {
  client,
  httpRequestsTotal,
  httpRequestDuration,
};