const bcrypt = require ('bcrypt');
const userService = require ('../services/user.services');
const AppError = require ('../errors/appError');
const jwt = require ('jsonwebtoken');
const config = require('../config');
const { loggers } = require('winston');


const login = async (email,password) =>{

    try{

        //validacion de Email
        const user = await userService.findByEmail(email);
        

        if(!user){
            throw new AppError('Authentication Failed Email / Password Incorrect',401);  
        }

        //Validacion usuario habilitado

        if(!user.enable){
            throw new AppError('Authentication Failed User not allowed',401);  
        }
        
        //Validacion de password

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            throw new AppError('Authentication Failed Email / Password Incorrect',401);  
        }

        // Generar token
        
        const token = _encrypt(user._id);

        return{
            token,
            user: user.name,
            role: user.role
        }

    }catch(error){
        throw error;
    }


}

_encrypt = (id) => {

    return jwt.sign({id}, config.auth.secret, { expiresIn: config.auth.ttl });

}

module.exports = {
    login
};
