/**
 * Examples:
 *   res.ok('some message'); // ==> {message: 'some message'}
 *   res.ok('some message', {key1: value1}); // ==> {message: 'some message', key1: value1}
 *   res.ok({key1: value1}); // ==> {key1: value1}
 */
import _ from 'lodash';

module.exports = function(...args) {
  let message;
  let data;
  if (_.isString(args[0])) {
    message = args[0];
    if (_.isPlainObject(args[1])) {
      data = args[1];
    }
  } else if (_.isPlainObject(args[0])) {
    data = args[0];
  }

  const response = {message, ...data};

  this.res.status(200).json(response);
};
