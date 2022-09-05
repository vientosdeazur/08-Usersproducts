const {Router} = require('express');
const {getAllUsers,createUser,updateUser,deleteUser, getById} = require('../controllers/users.controllers');
const {postRequestValidation, putRequestValidation, deleteRequestValidation, getbyIdRequestValidation, getAllrequestValidation} = require ('../middlewares/users/index');

const routes = Router();

routes.get('/',getAllrequestValidation, getAllUsers);
routes.post('/', postRequestValidation ,createUser);
routes.put('/:id',putRequestValidation,updateUser);
routes.get('/:id',getbyIdRequestValidation,getById);
routes.delete('/:id',deleteRequestValidation,deleteUser);

module.exports = {routes};