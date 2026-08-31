//Importing Local Required Modules
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { userCookieOptions } = require('../utils/cookieOptions');

const captainCookieOptions = {
  ...userCookieOptions,
  httpOnly: true,
};

module.exports.registerCaptain = async (req, res, next) =>{

  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const {fullname, email, password, vehicle} = req.body;
  const isCaptainAlreadyExist = await captainModel.findOne({email});

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: 'Captain already exists' });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.cookie('captainToken', token, captainCookieOptions);

  res.status(201).json({token, captain});
}


module.exports.loginCaptain = async (req, res, next) =>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const {email, password} = req.body;

  const captain = await captainModel.findOne({email}).select('+password');
  if (!captain){
    return res.status(404).json({ message: 'Captain not registered' });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch){
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = captain.generateAuthToken();
  
  res.cookie('captainToken', token, captainCookieOptions);

  res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req, res, next) =>{
  res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req, res, next) =>{
  const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[1];

  if (token) {
    await blacklistTokenModel.create({token});
  }

  res.clearCookie('captainToken');

  res.status(200).json({message: 'Logged out successfully'});
}

