'use strict';

var
  q = require('q'),
  fs = require('fs')
  ;

module.exports = {
  get: function () {
    var deferred = q.defer();
    var fileName = __dirname + '/../../config/config.json';
    fs.readFile(fileName, function (error, response) {
      if (error) deferred.reject(error);
      deferred.resolve(response);
    });
    return deferred.promise;
  }
};