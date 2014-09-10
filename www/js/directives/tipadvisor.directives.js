angular.module('tipadvisor.directives', [])
  .directive('calc', ["$animate",
    function($animate){
      return {
        templateUrl: './templates/calc.html',
        link: function(scope, element, attrs){
          $animate.addClass(element, 'slide-up-calc');
        }
      }
  }]);
