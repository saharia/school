const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String },
  password: { type: String, required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);