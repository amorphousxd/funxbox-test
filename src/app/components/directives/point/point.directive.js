(function() {
  'use strict';

  angular
    .module('test')
    .directive('point', Point);

  /** @ngInject */
  function Point() {

    var directive = {
      restrict: 'E',
      scope: {
        data: '=',
        index: '=',
        removePoint: '&',
        changePoint: '&'
      },
      templateUrl: 'app/components/directives/point/point.html',
      link: linkFunc,
      controller: PointController,
      controllerAs: 'vm'
    };

    return directive;

    var map, currentIndex;

    function linkFunc(scope){
    }

    function PointController($scope, $rootScope){

      var vm = this;
      vm.edit = edit;
      vm.endEdit = endEdit;
      vm.cancelEdit = cancelEdit;
      vm.removePoint = removePoint;
      vm.editing = false;
      vm.input = $scope.data.name;

      function edit(){
        vm.editing = true;
      }

      function endEdit($event){
        if(vm.canceled){
          return vm.canceled = false;
        }
        $scope.data.name = vm.input;

        console.log('changin point to' + $scope.data.name)
        $scope.changePoint({name: $scope.data.name});
        vm.editing = false;
      }

      function cancelEdit(){
        vm.canceled = true;
        vm.editing = false;
        vm.input = $scope.data.name;
      }

      function removePoint(){
        $scope.removePoint({index: $scope.index});
      }

    }
  }

})();
