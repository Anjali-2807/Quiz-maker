const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const h = req.header('Authorization');
  if(!h) return next();
  try {
    req.user = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET);
  } catch {}
  next();
};
