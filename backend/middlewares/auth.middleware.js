const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Access denied.'});
  }

  const isBlacklisted = await blacklistTokenModel.findOne({token: token});

  if (isBlacklisted) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {

    return res.status(401).json({message: 'Invalid token'});
  }
}
module.exports.authCaptain = async (req, res, next) =>{
   const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[1];

  if (!token){
    return res.status(401).json({message: 'Access denied.'});
  }

  const isBlacklisted = await blacklistTokenModel.findOne({token: token});

  if (isBlacklisted){
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();

    return next();
  } catch(error){
    console.log(error);

    return res.status(401).json({message: 'Invalid token'});
  }
}