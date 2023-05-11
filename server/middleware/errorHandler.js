const { stack } = require("../routes/routes");

const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode;
    switch (statusCode) {
        case 400:
            res.json({
                title: `${statusCode}: Validation`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 401:
            res.json({
                title: `${statusCode}: Unauthorized`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 403:
            res.json({
                title: `${statusCode}: Forbidden`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 404:
            res.json({
                title: `${statusCode}: Not Found`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 500:
            res.json({
                title: `${statusCode}: Internal Server Error`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: `${statusCode}: ${err.name}`,
                message: err.message,
                stackTrace: err.stack
            });
            break;
    };
};

module.exports = errorhandler;