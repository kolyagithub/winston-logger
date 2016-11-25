/**
 * Created by qudrat on 06/12/16.
 */

const _ = require('underscore')._
    , logger = require('../utils/logger')(__filename);

var users = [
    {
        'id': 1,
        'firstName': 'Michael',
        'lastName': 'Caine',
        'age': 23,
    },
    {
        'id': 2,
        'firstName': 'Daniel',
        'lastName': 'Craig',
        'age': 33,
    },
    {
        'id': 3,
        'firstName': 'Kate',
        'lastName': 'Winslet',
        'age': 27,
    }];

module.exports = {

    getList: function (req, res) {
        if(users.length == 0) 
            logger.warn('Users empty!');
        res.json(users || []);
        res.end();
    },

    getById: function (req, res) {
        var userId = req.params.id;
        var user = _.findWhere(users, {'id': parseInt(userId)});
        if(user == undefined) 
            logger.warn('User not found!');
        res.json(user || {});
        res.end();
    },

    addUser: function (req, res) {
        let id = req.body.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        users.push({
            'id': parseInt(id),
            'firstName': firstName,
            'lastName': lastName,
            'age': age,
        });
        res.json('Success!');
        res.end();
    },

    editUser: function (req, res) {
        let userId = req.params.id;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let age = req.body.age;
        let _find = false;
        _.each(users, function (user) {
            if(user.id == parseInt(userId)) {
                _find = true;
                user.firstName = firstName;
                user.lastName = lastName;
                user.age = age;
            }
        });
        if(!_find) {
            logger.warn('User not found for edit!');
            return res.json('User not found for edit!');
        }
        res.json('Success!');
        res.end();
    },

    deleteUser: function (req, res) {
        let userId = req.params.id;
        let user = _.findWhere(users, {'id': parseInt(userId)});
        if(user == undefined) {
            logger.warn('User not found for delete!');
            return res.json('User not found for delete!');
        }
        users = _.without(users, user);
        res.json('Success!');
        res.end();
    }
};