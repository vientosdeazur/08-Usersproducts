const {Router} = require('express');
const {getAllUsers,createUser,updateUser,deleteUser, getById} = require('../controllers/users.controllers');

const routes = Router();

routes.get('/',getAllUsers);
routes.post('/',createUser);
routes.put('/:id',updateUser);
routes.get('/:id',getById);
routes.delete('/:id',deleteUser);

module.exports = {routes};