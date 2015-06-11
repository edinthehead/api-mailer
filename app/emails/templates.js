'use strict';

var
  q = require('q'),
  fs = require('fs'),
  _ = require('underscore'),
  moment = require('moment')
  ;

function loadFile() {
  var deferred = q.defer();
  var filePath = __dirname + '/../../templates/list.json';
  fs.readFile(filePath, function (error, response) {
    if (error) deferred.reject(error);
    deferred.resolve(JSON.parse(response));
  });
  return deferred.promise;
}

module.exports = {

  get: function (id, datas) {
    var deferred = q.defer();
    loadFile().then(function (tempaltesCollection) {
      var indexedDatas = _.indexBy(tempaltesCollection, 'id');
      var template = indexedDatas[id];
      template.datas = datas;
      deferred.resolve(template);
    });
    return deferred.promise;
  }

};
