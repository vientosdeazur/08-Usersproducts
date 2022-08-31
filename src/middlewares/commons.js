const AppError = require ('../errors/appError');

const {check , validationResult} = require ('express-validator');

const _validationResult = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new AppError ('Validation errors', 400,errors.errors); 
    }
    next();

}

module.exports = {_validationResult};