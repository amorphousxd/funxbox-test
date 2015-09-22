(function() {
  'use strict';

  describe('map.directive', function(){

    var scope, el, controller, mockService;

    beforeEach(module('test'));
    beforeEach(function(){
      mockService = jasmine.createSpyObj('MapsService', ['geoCode']);
    })
    beforeEach(angular.mock.inject(function($rootScope, $compile){
      el = angular.element("<map></map>");
      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      scope = el.isolateScope() || el.scope();
      controller = el.controller("MapController as vm");
    }));

    it('should add point to points array after geocode call', function() {
      //expect(scope.vm.points.length === 0).toBeTruthy();
    });

  });
})();
