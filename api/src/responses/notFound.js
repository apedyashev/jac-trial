module.exports = function(message) {
  console.log('Sending 404 ("Not Found") response', {message});
  let response;
  if (process.env !== 'production' && message) {
    response = {message};
  }
  this.res.status(404).json(response);
};
