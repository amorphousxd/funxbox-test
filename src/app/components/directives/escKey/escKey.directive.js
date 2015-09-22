(function(){
  angular
    .module('test')
    .directive('escKey', escKey)

    function escKey() {
      return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if(event.which === 27) { // 27 = esc key
            scope.$apply(function (){
              scope.$eval(attrs.escKey);
            });
            event.preventDefault();
          }
        });
      };
    }

  angular
    .module('test')
    .directive('enterKey', enterKey)

  function enterKey() {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if(event.which === 13) { // 27 = enter key
          scope.$apply(function (){
            scope.$eval(attrs.enterKey);
          });
          event.preventDefault();
        }
      });
    };
  }

})();
