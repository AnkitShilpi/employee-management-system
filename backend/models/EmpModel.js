const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  empCode: { type: String, required: true, unique: true },
  doj: { type: Date, required: true },
  department: { type: String, required: true },
  project: { type: String, required: true },
});

module.exports = mongoose.model('Employee', empSchema);
