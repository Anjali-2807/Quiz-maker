const mongoose = require('mongoose');
const s = new mongoose.Schema({
  title:String,
  creator:{ type: mongoose.Types.ObjectId, ref:'User' },
  createdAt:{ type:Date, default:Date.now }
});
module.exports = mongoose.model('Quiz',s);
