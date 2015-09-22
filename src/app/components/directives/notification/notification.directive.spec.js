(function() {
  'use strict';

  describe('notification.directive', function(){

    var scope, el, controller;

    beforeEach(module('test'));
    beforeEach(angular.mock.inject(function($rootScope, $compile){
      el = angular.element("<notification></notification>");
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      scope = el.isolateScope() || el.scope();
      controller = el.controller;
    }));

    it('should contain alert danger with message: Error 404', function() {
    });

  });
})();
