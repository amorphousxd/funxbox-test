(function() {
  'use strict';
  angular
    .module('test')
    .factory('MapsService', MapsService);

  /** @ngInject */
  function MapsService($rootScope, $q) {

    var service = {
      getLine: getLine,
      geoCode: geoCode
    }

    return service;

    ///////////////

    function ready(){
      var deferred = $q.defer();

      ymaps.ready(function(){
        deferred.resolve();
      });

      return deferred.promise;
    }

    function geoCode(value){

      var deferred = $q.defer();

      ready().then(function(){
        ymaps.geocode(value, {
          results: 1
        }).then(function (res) {
          if(res.geoObjects.getLength() === 0){
            deferred.reject('Ничего не найдено');
          } else {
            deferred.resolve(res.geoObjects.get(0))
          }
        }, function(error){
        })
      })

      return deferred.promise;
    }

    function getLine(points){
      return new ymaps.GeoObject({
        geometry: {
          type: "LineString",
          coordinates: points.map(function(el){
            return el.object.geometry.getCoordinates();
          })
        }
      }, {
        strokeColor: "#FFFF00",
        strokeWidth: 5
      });
    }

  }
})(ymaps);
