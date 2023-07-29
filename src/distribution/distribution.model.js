const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  meal: {
    type: [Number],
    default: [0, 0, 0],
  },
  food: {
    type: Schema.Types.ObjectId,
    ref: 'Food',
  },
});

distributionSchema.set('timestamps', true);
distributionSchema.set('versionKey', false);

module.exports = mongoose.model('Distribution', distributionSchema);
