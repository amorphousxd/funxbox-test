(function() {
  'use strict';

  angular
    .module('test')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('maps', {
        url: '/maps',
        templateUrl: 'app/maps/maps.html',
        controller: 'MapsController',
        controllerAs: 'maps'
      });

    $urlRouterProvider.otherwise('/maps');
  }

})();
