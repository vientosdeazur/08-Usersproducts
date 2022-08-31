const {Router} = require('express');
const {login} = require('../controllers/auth.controllers');
const {postLoginRequestValidation} = require ('../middlewares/auth/index');

const routesauth = Router();

routesauth.post('/login',postLoginRequestValidation,login);

module.exports = {routesauth};