const { DbUser, DbRole } = require("../models")
const jwt = require('jsonwebtoken')

async function checkDuplicateEmailAuth(req,res,next){
  try {
    const isExistEmail = await DbUser.findOne({ email: req.body.email })
    if(isExistEmail){
      return res.status(409).json({message: 'Email already exists'})
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function checkExistRoles(req, res, next) {
  try {
    if(req.body.roles){
      const isExistRoles = await DbRole.find({ name: { $in: req.body.roles }})
      if(isExistRoles.length === 0){
        return res.status(404).json({message: `Role ${req.body.roles} does not exist`})
      }
      next()
    }
    next()
  } catch (error) {
    next(error)
  }
}
async function verifyUser(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    try {
      await renewToken(req, res); // Wait for token renewal
      // After renewing the token, recheck if the access token is available now
      if (req.cookies.accessToken) {
        return next(); // Proceed if token is available
      } else {
        return res.status(401).json({ message: 'Authentication required' });
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } else {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid access token' });
      } else {
        req.user = { _id: decoded.id, roles: decoded.roles };
        return next();
      }
    });
  }
}

function renewToken(req, res) {
  return new Promise((resolve, reject) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return reject(new Error('Refresh token has expired. Please login again'));
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(new Error('Invalid refresh token'));
      } else {
        const accessToken = jwt.sign(
          { id: decoded.id, roles: decoded.roles },
          process.env.ACCESS_TOKEN_JWT_SECRET_KEY,
          { expiresIn: '60m' }
        );

        res.cookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 1000 // 1 minute
        });

        req.user = { _id: decoded.id, roles: decoded.roles };

        return resolve(); // Token successfully renewed
      }
    });
  });
}


function authorizeRoles(roles) {
  return (req, res, next) => {
    if (!req.user?.roles) {
      return res.status(403).json({ message: 'Forbidden: No roles assigned' });
    }

    const userRoles = req.user.roles;
    const hasRole = roles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }

    next();
  };
}



const authMiddlewares = {
  checkDuplicateEmailAuth, checkExistRoles, verifyUser, authorizeRoles
}
module.exports = authMiddlewares