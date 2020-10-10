const mongoose = require('mongoose');

const ExpSchema = mongoose.Schema({
  expression: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('expressions', ExpSchema);
