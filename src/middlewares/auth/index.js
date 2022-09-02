const {check} = require ('express-validator');
const {validToken} = require ('../../services/auth.services');
const userService = require('../../services/user.services');
const {_validationResult} = require ('../commons');

const _emailRequired = check('email','Email is required').not().isEmpty();
const _passwordRequired = check('password','Password is required').not().isEmpty();
const _emailvalid = check('email','Email is invalid').isEmail();

const _validJWT = async (req,res,next)=>{
    try {
        
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();

    } catch (error) {
        next (error);
    }
}

const postLoginRequestValidation =  [

    _emailRequired,
    _passwordRequired,
    _emailvalid,
    _validationResult

]


module.exports = {postLoginRequestValidation,_validJWT};