module.exports = function(model, data, next) {
  new model(data).save(function(err) {
    if (err)
      console.log(err);
    next();
  });
}