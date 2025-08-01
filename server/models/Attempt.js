const mongoose = require('mongoose');
const s = new mongoose.Schema({
  quiz:{ type: mongoose.Types.ObjectId, ref:'Quiz' },
  taker:{ type: mongoose.Types.ObjectId, ref:'User', required:false },
  answers:[{
    question:{ type: mongoose.Types.ObjectId, ref:'Question' },
    selectedIndex:Number,
    isCorrect:Boolean
  }],
  score:Number,
  takenAt:{ type:Date, default:Date.now }
});
module.exports = mongoose.model('Attempt',s);
