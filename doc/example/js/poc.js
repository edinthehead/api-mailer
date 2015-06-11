'use strict';

//region Page
$(function () {

  var
    tb_recipient = $("#tb_recipient"),
    btn_send = $("#btn_send"),
    return_job = $('#return_job'),
    error_job = $('#error_job');

  btn_send.click(function () {

    return_job.html('');
    error_job.html('');

    try {

      var options = {
        templateID: 1,
        recipient: tb_recipient.val(),
        binding: {
          date: moment().format('DD/MM/YYYY'),
          email: 'email@domain.de',
          password: 'secret',
          civilite: 'M',
          name: 'Dupond'
        }
      };

      $.ajax({
        type: "POST",
        url: "http://10.10.1.26:3000/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(options),
        success: function (response) {
          console.error(response);
          if(response.response == true)
          return_job.html('Le message a bien été envoyé.');
        },
        fail: function (error) {
          throw new Error(error.error);
        }
      });
    }
    catch (err) {
      error_job.html(['Une erreur s\'est produite lors de l\'envoi du message : ', err].join());
      console.error(error);
    }

  });


});
//endregion




