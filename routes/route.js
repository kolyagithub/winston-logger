/**
 * Created by qudrat on 06/12/16.
 */

var express = require('express')
    , route = express.Router()
    , userController = require('../controllers/user');


route.get('/user/list', userController.getList);
route.get('/user/:id/get', userController.getById);
route.post('/user/add', userController.addUser);
route.put('/user/:id/edit', userController.editUser);
route.delete('/user/:id/delete', userController.deleteUser);


module.exports = route;