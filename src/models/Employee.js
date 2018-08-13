const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    match: [/.+\@.+\..+/, 'invalid email'],
    required: [true, 'required'],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
schema.plugin(timestamps);

mongoose.model('Employee', schema);
