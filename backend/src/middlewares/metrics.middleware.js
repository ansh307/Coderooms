const {
  httpRequestsTotal,
  httpRequestDuration,
} = require("../metrics/metrics");

module.exports = (req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const route = req.route?.path || req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route,
      status: res.statusCode,
    });
  });

  next();
};