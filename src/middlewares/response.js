const response = (_, res, next) => {
    res.success = (data, status = 200, passProps = {}) => {
        res.status(status).json({ status: "success", data, ...passProps });
    };

    res.error = (data, status = 500) => {
        res.status(status).json({ status: "error", data });
    };
    next();
};

module.exports = response;
