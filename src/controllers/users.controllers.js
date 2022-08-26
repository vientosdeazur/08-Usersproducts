const express = require ('express');
const userService = require('../services/user.services')

const getById = async (req,res,next) => {

    try {

        const result = {
            user: await userService.findById(req.params.id)
        }
        res.status(200).json(result);   
    } catch (err){
        next (err);
    }

}

const getAllUsers = async (req, res,next) => {
    try{
        let users = await userService.findAll();
        res.status(200).json(users);    
    }
    catch (err){
        next (err);
    }
}



const createUser = async (req, res,next) => {
    
  
    try {
        let user = req.body;
    user = await userService.save(user) ;
  
    const result = {
        message: 'User Created',
        user  
      }
      
    res.status(201).json(result);

    } catch (err){
        next(err);
    }
    
  }


/* const modifyUser = async (req, res,next) => {

    try{
    
        const {id} = req.params;
    let user = req.body;
    user._id=id;
    userService.update(user);

    

    const result = {
        message: 'User Modified with patch',
        user
    }
    res.json(result);
    } catch(err) {
        next(err);
    }
    
  } 
*/

const updateUser = async (req, res,next) => {

    try{
        const id = req.params.id;
        let user = req.body;
        
        const userUpdated = await userService.update(id,user);
    
        const result = {
            message: 'User Updated',
            user
        }
    
        res.json(result);    
    }catch (err) {
        next(err);

    }
  }


const deleteUser = async(req, res,next) => {

    try{

    const id = req.params.id;
    let user = await userService.remove(id);
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
    // modifyUser,
    updateUser,
    deleteUser,
    getById
    
}