const bodyParser = require('body-parser');
const express = require('express');

module.exports = function (app) {
  // Parse incoming requests with JSON payloads
  app.use(express.json());

  // Parse incoming requests with URL-encoded payloads
  app.use(express.urlencoded({ extended: true }));
};

