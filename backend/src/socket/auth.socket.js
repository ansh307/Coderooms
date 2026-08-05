const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
    try {
        const token = socket.handshake.headers.token;

        if (!token) {
            return next(new Error("Unauthorized: No token"));
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        socket.user = decoded;
    
        next();
    } catch (err) {
        console.error(err);
        next(new Error(err.message));
    }
};
