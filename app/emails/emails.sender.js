var
  q = require('q'),
  _ = require('underscore'),
  path = require('path'),
  bind = require('bind'),
  nodemailer = require('nodemailer');

var transporter = null;

var init = function (config) {

  console.log('email-transporter-technical:init()');

  transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

};

var processing = function (recipient, config, template) {

  var deferred = q.defer();

  console.log('email-transporter-technical:processing()');

  var emailsContents = [
    {extension: 'html', resource: null},
    {extension: 'txt', resource: null}
  ];

  getContents(emailsContents, template)

    .then(function (contents) {

      var indexedContents = _.indexBy(contents, 'extension');

      var options = {
        from: config.email.auth.user + ' <' + config.email.auth.user + '>',
        to: recipient,
        bcc: config.email.recipients.bcc,
        subject: template.title,
        text: indexedContents.txt.resource,
        html: indexedContents.html.resource
      };

      transporter.sendMail(
        options,
        function (error, info) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(info.response);
          }
        });

    })
    .fail(function (error) {
      deferred.reject(error);
    }
  );

  return deferred.promise;

};

bindContent = function (type, template) {
  var deferred = q.defer();
  var prefixe = parseInt(template.id)<9?'0':'';
  var filename = path.join(__dirname, './../../templates/' + prefixe + template.id + '/template.' + type);
  bind.toFile(
    filename,
    template.datas,
    function (content) {
      deferred.resolve(content);
    });
  return deferred.promise;
};

getContents = function (contents, datas) {
  var deferred = q.defer();
  bindContents(contents);
  function bindContents(contents, index) {
    index = index | 0;
    var content = contents[index];
    if (index < contents.length) {
      bindContent( content.extension, datas)
        .then(function (resource) {
          content.resource = resource;
          bindContents( contents, index + 1);
        })
        .fail(function (error) {
          deferred.reject(error);
        });
    } else {
      deferred.resolve(contents);
    }
  }

  return deferred.promise;
};

module.exports = {
  init: init,
  processing: processing
};
