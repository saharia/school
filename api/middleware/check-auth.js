const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
const User = db.User;


module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if(token) {
      const decoded = jwt.verify(token, 'secret');
      // req.user = decoded;
      // console.log('token decode', decoded.sub);
      let userDeatils = await User.findOne({ _id: decoded.sub }).populate('role');
      req.user = userDeatils;
      if(userDeatils) {
        next();
      } else {
        return res.status(401).json({
          message: 'Auth failed'
        });  
      }
    } else {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};