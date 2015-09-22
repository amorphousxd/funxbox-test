(function() {
  'use strict';

  angular
    .module('test')
    .directive('map', Map);

  /** @ngInject */
  function Map() {

    var directive = {
      restrict: 'E',
      scope: {},
      templateUrl: 'app/components/directives/map/map.html',
      link: linkFunc,
      controller: MapController,
      controllerAs: 'vm'
    };

    return directive;

    var map, currentIndex, currentRoute;

    function linkFunc(scope, element){

      ymaps.ready(init);

      function init() {
        map = new ymaps.Map('map', {
          center: [55.76, 37.64], // Москва
          zoom: 10
        }, {
          searchControlProvider: 'yandex#search'
        });
      }

      $(function  () {
        var group = $("ol.points-list").sortable({
          onDrop: function ($item, container, _super, event) {
            $item.removeClass(container.group.options.draggedClass).removeAttr("style");
            $("body").removeClass(container.group.options.bodyClass);
            var sortArr = group.sortable("serialize").get()[0].map(function(el){
              return el.$scope.point.index;
            })
            scope.vm.points = getSorted(scope.vm.points, sortArr);
            scope.vm.createRoute();
            scope.$apply();
          }
        });
      });

    }

    function MapController($scope, $rootScope, $timeout, MapsService, NotificationService){

      var vm = this;
      var allPointsCounter = 0;
      vm.points = [];
      vm.newPoint = '';

      vm.pointEntered = pointEntered;
      vm.addPoint = addPoint;
      vm.removePoint = removePoint;
      vm.createRoute = createRoute;
      vm.changePoint = changePoint;

      //on enter input value
      function pointEntered(){
        addPoint(vm.newPoint);
        vm.newPoint = '';
      }

      //geocode value and adds to the map
      function addPoint(value, replaceIndex){
        MapsService.geoCode(value).then(function(object){
          var geoObject = object;
          var coords = geoObject.geometry.getCoordinates();
          var bounds = geoObject.properties.get('boundedBy');
          geoObject.options.set({draggable: true});
          addEvents(geoObject, allPointsCounter);

          var pointObject = {
            name: geoObject.properties.get('name'),
            object: geoObject,
            coordinates: geoObject.geometry.getCoordinates(),
            bounds: bounds,
            index: allPointsCounter++
          };

          if(typeof replaceIndex !== 'undefined'){
            map.geoObjects.remove(vm.points[replaceIndex].object);
            vm.points[replaceIndex] = pointObject;
          } else {
            vm.points.push(pointObject);
          }

          map.geoObjects.add(geoObject);
          map.setBounds(bounds, {
            checkZoomRange: true
          });

          createRoute();
        }, function(error){
          NotificationService.alert(error);
        })

      }

      //removes point from map and list
      function removePoint(index){
        var spliceIndex = _.findIndex(vm.points, {index: index});
        map.geoObjects.remove(vm.points[spliceIndex].object);
        vm.points.splice(spliceIndex, 1);
        createRoute();
      }

      function changePoint(index, name){
        var replaceIndex = _.findIndex(vm.points, {index: index});
        addPoint(name, replaceIndex);
      }

      function createRoute(){
        if(map.geoObjects.getLength() < 2) return;
        var line = MapsService.getLine(vm.points);

        map.geoObjects.each(function(el){
          if(el === currentRoute){
            map.geoObjects.remove(currentRoute);
          }
        })

        map.geoObjects.add(line);
        currentRoute = line;
      }

      function addEvents(object, index){
        object.events.add("dragend", function (event) {
          var currentCoordinates = object.geometry.getCoordinates();
          MapsService.geoCode(currentCoordinates).then(function (geoObject) {
            object.properties = geoObject.properties;
            object.properties.set({name: geoObject.properties.get('name')});
            vm.points[_.findIndex(vm.points, {index: index})].name = geoObject.properties.get('name');
          });
          createRoute();
        });
      }

    }

    function getSorted(arr, sortArr) {
      var result = [];
      for(var i=0; i<arr.length; i++) {
        for(var j=0; j< arr.length; j++){
          if(arr[j].index === sortArr[i])
          result[i] = arr[j];
        }
      }
      return result;
    }
  }

})(ymaps, _);





