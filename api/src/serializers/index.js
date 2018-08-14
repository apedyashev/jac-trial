import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const serializers = {};
function loadSerializers() {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach((file) => {
      const baseName = path.basename(file, '.js');
      console.log('Loading serializer', {file, baseName});
      const serializer = require(path.join(__dirname, file));
      serializers[baseName] = serializer;
    });
}
loadSerializers();

module.exports = (req, res, next) => {
  _.each(serializers, (responseFn, responseFnName) => {
    res[responseFnName] = responseFn.bind({req, res});
  });
  next();
};
