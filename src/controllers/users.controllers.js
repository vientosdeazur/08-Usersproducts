const express = require ('express');
const User = require('../models/users');

const getAllUsers = async (req, res,next) => {
    try{
        let users = await User.find();
        res.status(200).json(users);    
    }
    catch (err){
        next (err);
    }
}



const createUser = async (req, res,next) => {
    
  
    try {
        let user = req.body;
    user = await User.create(user) ;
  
    const result = {
        message: 'User Created',
        user  
      }
      
    res.status(201).json(result);

    } catch (err){
        next(err);
    }
    
  }


const modifyUser = async (req, res,next) => {

    try{
    
        const {id} = req.params;
    let user = req.body;
    user._id=id;
    User.updateOne(user);

    

    const result = {
        message: 'User Modified with patch',
        user
    }
    res.json(result);
    } catch(err) {
        next(err);
    }
    
  }


const updateUser = (req, res) => {

    const {id} = req.params;
    let user = req.body;
    user.id = id;

    const result = {
        message: 'User Updated',
        user
    }

    res.json(result);
  }


const deleteUser = async(req, res,next) => {

    try{

    const {id} = req.params;
    let user = await User.findById(id);
    user.remove();

    const result = {
        message: ` User with id: ${id} Deleted`
    }
    
    res.json(result);
    }
    catch (err) {
        next(err);
    }
  }

module.exports = {
    getAllUsers,
    createUser,
    modifyUser,
    updateUser,
    deleteUser
}