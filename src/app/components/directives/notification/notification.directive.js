(function() {
  'use strict';

  angular
    .module('test')
    .directive('notification', Notification);

  function Notification(){

    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
      },
      templateUrl: 'app/components/directives/notification/notification.html',
      link: function(scope, element, attrs, fn) {
      },
      controller: function($scope, NotificationService){
        NotificationService.clear();
        $scope.alertData = NotificationService;
      }
    };

    return directive;
  }

})();
