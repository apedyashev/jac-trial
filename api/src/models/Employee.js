const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

/**
 * @swagger
 *  definitions:
 *   SerializedEmployee:
 *     allOf:
 *       - $ref: '#/definitions/BaseModel'
 *       - properties:
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          avatar:
 *            type: string
 */
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
schema.plugin(mongoosePaginate);
schema.plugin(toJson);

mongoose.model('Employee', schema);
