'use strict';

const prismaClient = require("../client")
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

  Default.addUser(body.userEmail, prismaClient)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
