1. Installation
===============


  Taper la commande suivante à la racine du projet :
  
    npm install




2. Configuration
================

  Éditer le fichier "/config/config.json"

  {
    "email": {
      "service": "Gmail",
      "auth": {
        "user": "[compte de test]@gmail.com",
        "pass": "[xxxxxxxxx]"
      },
      "recipients": {
        "bcc": "[bcc-recipient]"
      }
    }
  }

  Remplacer les données [compte de test] & [xxxxxxxxx] par celles du compte utilisé pour l'envoi.
  Remplacer [recipient] par l'adresse e-mail du destinataire.
  Remplacer [bcc-recipient] par l'adresse e-mail d'un destinataire devant être en copie carbonne des emails envoyés.




3. Excécution
=============

  Lancer la tache grunt appelé 'serve' en tapant la ligne de commande suivante :
  
    grunt serve
  
  Ou bien exécuter le serveur directement a partir de node en tapant la commande suivante :

    node app/server/www.js

  
  Ces commandes lancent un serveur localement sur le port 3000.
  Le serveur tourne lorsque dans la console est affichée le message "Express server listening on port 3000"
   
  Afin de vérifier l'accessiblité du serveur, ouvrir un navigateur à l'url suivante : 
  
    http://localhost:3000
  
  
  

4. Exemple de POST en ajax
==========================

  Un POC est à disposition dans "doc/example/index.html"
  
  Entrer une adresse email valide et cliquer sur le bouton d'envoi.
  
  
  

5. Ajouter un template
======================

  Les templates d'emailing se trouvent dans le dossier "/templates"
  
  A la racine de ce dossier se trouve un fichier "list.json" de la forme suivante :
  
  [
    {
      "id": 1,
      "name": "Envoi login + mdp",
      "title": "Vos codes d'accès",
      "path": "01/template.html"
    }
  ]
  
  Pour ajouter un second template, le déclarer comme suit :
  
  [
    {
      "id": 1,
      "name": "Envoi login + mdp",
      "title": "Vos codes d'accès",
      "path": "01/template.html"
    },
    {
       "id": 2,
        "name": "Mon nouveau template",
        "title": "Le template",
        "path": "02/template.html"
    }
  ]

  - Le paramètre @id doit être unique dans la liste. 
    Il correspond au nom du dossier du template à placer dans "/templates".
    Si l'id est inférieur à 10, nommer le dossier template en ajoutant un "0" devant. ex : "/templates/02" (et non "/templates/2")
  - Le paramètre @name est un nom utilisé uniquement dans le fichier "/templates/list.json"
  - Le paramètre @title sera utilisé comme objet de l'email lors de l'envoi d'un e-mail basé sur ce template.
  - Le paramètre @path correspond au chemin d'accès du template html.
  
  Placer ensuite dans le dossier "/templates/02/" les deux fichiers de template :
    -> "/templates/02/template.html" utilisé dans la version HTML de l'e-mail.
    -> "/templates/02/template.txt" utilisé dans la version TEXTE de l'e-mail.



6. Binding
==========

  Le binding correspond à l'action de remplissage des variable.
  
  Comme utilisé dans le POC, les variables utilisées lors de l'envoi de l'e-mail seront contenu dans l'objet "binding" de l'objet "options" :
    
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
  
  Pour définir une variable à binder dans le template, la notation suivante devra être utilisé : (:variable:)
  
  Exemple : En plaçant (:email:) dans les templates HTML et TEXTE, cette donnée sera remplacée lors de l'envoi de l'e-mail par la donnée postée "options.binding.email". 




ANNEXES
=======

  Penser à installer le plugin md de WebStorm pour une lecture plus agréable de ce message

  Autres solutions possibles :
    - http://mandrillapp.com
    - Service SMTP de IIS
