
const authRepository = require("../../repositories/auth/auth.repository")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.json());

async function register(req, res, next) {
  try {
    const {
      email,
      password,
      roles
    } = req.body
    console.log(email,password)
    const status = false
    const newUser = await authRepository.register({email, password, status, roles})
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const {email, password} = req.body
    const user = await authRepository.login(email)
    const roles = await authRepository.getRoleNameByIds(user.roles)
    if(!user) {
      return res.status(404).json({message: 'Email not found'})
    }else{
      if(user.status === false) {
        return res.status(401).json({message: 'Your account is not active'})
      }
      if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).json({message: 'Password is not correct'})
      }else{
        const accessToken = jwt.sign({id: user._id, roles: roles}, process.env.ACCESS_TOKEN_JWT_SECRET_KEY, {expiresIn: '10m'})
        const refreshToken = jwt.sign({id: user._id, roles: roles}, process.env.REFRESH_TOKEN_JWT_SECRET_KEY, {expiresIn: '60m'})
        res.cookie('accessToken', accessToken, {
          maxAge: 10*60*1000,// 10 min
          httpOnly: true 
        })
        res.cookie('refreshToken', refreshToken, {
          maxAge: 60*60*1000,
          httpOnly: true
        })
        return res.status(200).json({message: 'Login success', roles: roles})
      }
    }
  } catch (error) {
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json({message: 'Logout success'})
  } catch (error) {
    next(error)
  }
}

const authController = {
  register, login, logout
}
module.exports = authController