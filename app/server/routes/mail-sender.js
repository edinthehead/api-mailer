'use strict';

var
  express = require('express'),
  configLoader = require('./../../tools/configLoader'),
  templates = require('./../../emails/templates'),
  email = require('./../../emails/email')
  ;

var router = express.Router();

router

  .get('/', function (req, res) {
    res.render('index', {title: 'apiMailer'});
  })

  .post('/', function (request, response) {

    var options = request.body;

    configLoader
      .get()
      .then(function (config) {

        templates.get(options.templateID, options.binding)
          .then(function (template) {

            email.init(config);

            email.send(
              options.recipient,
              config,
              template
            )
              .then(function (result) {
                response.status(200).send({response: true}).end();
              })
              .fail(function (error) {
                response.status(500).send({error: error}).end();
              });

          });

      })

      .fail(function (error) {
        response.status(500).send({error: error}).end();
      });

  });

module.exports = router;

