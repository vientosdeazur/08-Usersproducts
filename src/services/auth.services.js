const bcrypt = require ('bcrypt');
const userService = require ('../services/user.services');
const AppError = require ('../errors/appError');
const jwt = require ('jsonwebtoken');
const config = require('../config');
const logger = require ('../loaders/loggers');
const { loggers } = require('winston');
const { token } = require('morgan');


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

const validToken = async (token) =>{

    try{
    
        //validar que token sea recibido como parametro
    
        if(!token){
            throw new AppError('Authentication Failed / Token Required',401)
        }

        logger.info(`Token Received ${token}`);

    
        //validar que el token sea integro
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret);    
            id = obj.id;
        } catch (verifyError) {
            throw new AppError('Authentication Failed / Invalid Token',401,token);
            
        }
        
    
        //validar que haya usuario en db

        const user = await userService.findById(id);
        if (!user){
            throw new AppError ('Invalid Token - User not found',401);
        }

    //validar si el usuario esta habilitado
        if(!user.enable){
            throw new AppError ('User disabled');
        }

    //retornar usuario
        return user;
 
    }catch(err){
        throw err;
    }
}

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)){
        throw new AppError('Authentication Failed User dont have Privileges',401);
    }
    return true;
}

_encrypt = (id) => {

    return jwt.sign({id}, config.auth.secret, { expiresIn: config.auth.ttl });

}

module.exports = {
    login,
    validToken,
    validRole
};
