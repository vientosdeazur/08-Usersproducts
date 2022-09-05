const {check} = require ('express-validator');
const AppError = require ('../../errors/appError');
const {_validJWT,hasRole} = require ('../auth');
const userService = require('../../services/user.services');
const {ROLES, ADMIN_ROLE} = require ('../../constant/index');
const {_validationResult} = require ('../commons');

const _nameRequired = check('name','Name is required').not().isEmpty();
const _lastnameRequired = check('lastname','LastName is required').not().isEmpty();
const _emailRequired = check('email','Email is required').not().isEmpty();
const _passwordRequired = check('password','Password is required').not().isEmpty();
const _emailvalid = check('email','Email is invalid').isEmail();
const _dateValid = check('birthdate').optional().isDate('MM-DD-YYYY');

const _optionalemailvalid = check('email','Email is invalid').optional().isEmail();

const _emailexist = check('email').custom(
    async (email='')=>{
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already in use',400);
        }
    }
    )
;

const _optionalemailexist = check('email').optional().custom(
    async (email='')=>{
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already in use',400);
        }
    }
    )
;

const _idexist = check('id').custom(
    async (id ='')=>{
        const userFound = await userService.findById(id);
        if(!userFound){
            throw new AppError('Id Does not exist in Database',400);
        }
    }
    )
;

const _roleValid = check('role').optional().custom(
    async (role='')=>{
                if(!ROLES.includes(role)){
            throw new AppError('Invalid Role',400);
        }
    }
    )
;

const _idRequired = check('id').not().isEmpty();
const _idIsMongoDb = check('id').isMongoId();


const deleteRequestValidation = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idexist,
    _idIsMongoDb,
    _idRequired,
    _validationResult
]

const getbyIdRequestValidation = [
    _validJWT,
    _idexist,
    _idIsMongoDb,
    _idRequired,
    _validationResult
]

const putRequestValidation = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _optionalemailvalid,
    _optionalemailexist,
    _roleValid,
    _dateValid,
    _idIsMongoDb,
    _idRequired,
    _idexist,
    _validationResult


]

const getAllrequestValidation = [
    _validJWT
]




const postRequestValidation = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastnameRequired,
    _emailRequired,
    _emailvalid,
    _emailexist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    _validationResult
]

module.exports = {
    postRequestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getbyIdRequestValidation,
    getAllrequestValidation
}