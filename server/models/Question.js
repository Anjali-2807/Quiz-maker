const mongoose = require('mongoose');
const s = new mongoose.Schema({
  quiz:{ type: mongoose.Types.ObjectId, ref:'Quiz' },
  text:String,
  choices:[String],
  correctIndex:Number
});
module.exports = mongoose.model('Question',s);
