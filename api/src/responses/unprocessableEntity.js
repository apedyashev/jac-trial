import _ from 'lodash';

function validationError(err) {
  let responseData = {};
  if (err.name === 'ValidationError' && err.errors) {
    const validationErrors = _.mapValues(err.errors, ({message}) => {
      return message;
    });
    const result = {validationErrors};
    if (process.env !== 'production') {
      result.originalError = err;
    }
    responseData = result;
  } else if (_.isPlainObject(err)) {
    const validationErrors = serializeMessagesObject(err);
    if (validationErrors) {
      responseData = {validationErrors};
    }
  } else {
    throw new Error('unable to serialize error - unknown format');
  }

  return responseData;
}

function serializeMessagesObject(err) {
  const validationErrors = _.mapValues(err, (fieldData) => {
    if (_.isString(fieldData)) {
      return i18next.t(fieldData);
    } else if (_.isPlainObject(fieldData) && _.isString(fieldData.message)) {
      const {message, ...rest} = fieldData;
      return i18next.t(message, {...rest});
    }
    return null;
  });

  return _.omitBy(validationErrors, _.isNull);
}

module.exports = function unprocessableEntity(...args) {
  console.log('Sending 422 ("Unprocessable Entity") response', args);

  let message;
  let err;
  if (_.isString(args[0])) {
    message = args[0];
    if (_.isObject(args[1])) {
      err = args[1];
    }
  } else if (_.isObject(args[0])) {
    err = args[0];
  }

  this.res.status(422).json({message, ...validationError(err)});
};
