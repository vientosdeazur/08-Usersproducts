const express = require ('express');

const getAllUsers = (req, res) => {
    const users = [
        {
            id: 1,
            name: 'Juan'
        },
        {
            id: 2,
            name: 'Pedro'
        }
    ]
  
  
    res.status(200).json(users);
    
}



const createUser = (req, res) => {
    
  
    const user = req.body;
    user.id = 47 ;
  
    const result = {
        message: 'User Created',
        user  
      }
      
    res.status(201).json(result);
  }


const modifyUser = (req, res) => {

    const {id} = req.params;
    const user = req.body;

    user.id = id;

    const result = {
        message: 'User Modified with patch',
        user
    }
    res.json(result);
  }


const updateUser = (req, res) => {

    const {id} = req.params;
    const user = req.body;
    user.id = id;

    const result = {
        message: 'User Updated',
        user
    }

    res.json(result);
  }


const deleteUser = (req, res) => {

    const {id} = req.params;

    const result = {
        message: ` User with id: ${id} Deleted`
    }
    
    res.json(result);
  }

module.exports = {
    getAllUsers,
    createUser,
    modifyUser,
    updateUser,
    deleteUser
}