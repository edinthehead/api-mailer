'use strict';

var
  q = require('q'),
  fs = require('fs')
  ;

module.exports = {
  get: function () {
    var deferred = q.defer();
    fs.readFile(__dirname + './../../config/config.json', function (error, response) {
      if (error) deferred.reject(error);
      // console.log(JSON.parse(response));
      deferred.resolve(JSON.parse(response));
    });
    return deferred.promise;
  }
};