'use strict';

var
  q = require('q'),
  _ = require('underscore'),
  moment = require('moment'),
  emailSender = require('./emails.sender.js');

moment.locale('fr');

module.exports = {

  init: function (config) {
    emailSender.init(config);
  },

  send: function (recipient, config, datas) {

    var deferred = q.defer();

    emailSender.processing(
      recipient,
      config,
      datas
    )
      .then(function (results) {
        deferred.resolve(results);
      })
      .fail(function (error) {
        deferred.reject(error);
      });

    return deferred.promise;

  }

};