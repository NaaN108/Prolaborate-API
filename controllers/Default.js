'use strict';

const Context = require("../context")
const { check, validationResult } = require('express-validator');
var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.addGroup = function addGroup (req, res, next) {
  Default.addGroup()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addUser = function addUser (req, res, next, body) {
  if (Default.userExists(body.userEmail, Context())){
  Default.addUser(body.userEmail, Context())
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  }
  else {
    utils.writeJson(res, {"error": "user already exists"}, 409)
  }
};
