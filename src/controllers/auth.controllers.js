const express = require ('express');
const userService = require('../services/user.services');
const Success = require ('../handlers/succesHandlers');
const logger = require ('../loaders/loggers');
const { request ,response } = require('express');

const login = async (req = request,res = response,next) => {

    const {email,password} = req.body;
    try {

        res.json(new Success({test:'Ingreso al login'}));

    }catch(error) {
        next (error);
    }

}


module.exports = {
    login
}