const {Router} = require('express');
const {getAllUsers,createUser,updateUser,modifyUser,deleteUser} = require('../controllers/users.controllers');

const routes = Router();

routes.get('/',getAllUsers);
routes.post('/',createUser);
routes.put('/:id',updateUser);
routes.patch('/:id',modifyUser);
routes.delete('/:id',deleteUser);

module.exports = {routes};