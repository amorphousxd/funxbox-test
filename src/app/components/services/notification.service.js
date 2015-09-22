(function() {
  'use strict';
  angular
    .module('test')
    .factory('NotificationService', NotificationService);

  /** @ngInject */
  function NotificationService($timeout){

    var type = 'danger';
    var message = '';

    var service = {
      type: type,
      message: message,
      alert: alert,
      clear: clear
    }

    return service;

    function alert(message, _type){
      setMessage(message);
      if(_type) setType(_type);
      $timeout(function(){
        clear();
      }, 3000)
    }

    function clear(){
      setMessage('');
      setType('danger');
    }

    function getType(){
      return type;
    }

    function getMessage(){
      return message;
    }

    function setMessage(message){
      service.message = message;
    }

    function setType(type){
      service.type = type;
    }

  }

})();
