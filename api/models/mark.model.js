const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  mark: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Mark', schema);