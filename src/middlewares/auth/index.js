const {check} = require ('express-validator');
const userService = require('../../services/user.services');
const {_validationResult} = require ('../commons');

const _emailRequired = check('email','Email is required').not().isEmpty();
const _passwordRequired = check('password','Password is required').not().isEmpty();
const _emailvalid = check('email','Email is invalid').isEmail();


const postLoginRequestValidation =  [

    _emailRequired,
    _passwordRequired,
    _emailvalid,
    _validationResult

]


module.exports = {postLoginRequestValidation};