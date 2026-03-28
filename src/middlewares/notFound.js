const notFound = (_, res) => {
  res.error("Resource not found", 404);
};

module.exports = notFound;
