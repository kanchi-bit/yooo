const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: String,
  status: String,
  priority: String
});

// Compound index
taskSchema.index({ status: 1, priority: 1 });

module.exports = mongoose.model('Task', taskSchema);