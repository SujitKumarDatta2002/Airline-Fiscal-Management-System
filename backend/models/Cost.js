
const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  costType: {
    type: String,
    enum: ['Fuel', 'Maintenance'],
    required: true
  },
  description: { type: String },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Cost', costSchema);