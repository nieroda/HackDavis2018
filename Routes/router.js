const express = require('express'),
      helpers = require('../helpers/res');
      Router  = express.Router();
      var db = require('../DAL/dbinsert');


/*
Router.route('/*')
  .get()
  .post()
*/
Router.route('/index')
    .get(helpers.getAllUsers)

Router.route('/login')
  .get(helpers.getLogin)
  .post(helpers.postLogin)

Router.route('/')
  .get(helpers.getAllUsers);

Router.route('/set/:number')
  .get(helpers.getSet)
  .post(helpers.postSet)
  .delete(helpers.deleteSet)


Router.route('/user/:id')
  .get(helpers.getUser)
  .post(helpers.addUserSet)
  .delete(helpers.deleteFullSet);


module.exports = Router;
