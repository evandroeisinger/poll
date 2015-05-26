module.exports = function(next, redis) {
  redis.flushdb(function(err) {
    if (err)
      console.log(err);
    next();
  });
}