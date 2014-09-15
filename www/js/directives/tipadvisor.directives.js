angular.module('tipadvisor.directives', [])
  .directive('calc', ["$animate",
    function($animate){
      return {
        templateUrl: './templates/calc.html',
        // link: function(scope, element, attrs){
        //   $animate.addClass(element, 'slide-up-calc');
        // }
      };
  }]);
angular.module('tipadvisor.directives')
  .directive('showcalc', ["$compile",
    function($compile){
      return function(scope, element, attrs){
        element.bind("click", function(){
          console.log("I'm in the directive");
          var calcSpace = angular.element(document.getElementById('calc'));
          var ionContent = angular.element(document.getElementById('calc-showable'));
          if (calcSpace.length == 0){
            ionContent.append($compile("<div calc class='hidden-calc' id='calc'></div>")(scope));  
          }
          else {
            angular.element(document.getElementById('calc')).remove();          
          }
        })
      }
  }]);
  // .directive('showCalc', ["$compile",
  //   function($compile){
  //     return function(scope, element, attrs){
  //       element.bind("click", function(){
  //         console.log("I'm in the directive");
  //         var calcSpace = angular.element(document.getElementById('calc-space'));
  //         var ionContent = angular.element(document.getElementById('calc-showable'));
  //         if (calcSpace == null){
  //           ionContent.append($compile("<div calc></div>")(scope));
  //         }
  //         else {
  //           calcSpace.remove();
  //         }
  //       });
  //     };
  // }]);
  // .directive('showCalc', ["$compile",
  //   function(){
  //     console.log("I'm in the func!");
  //     return {
  //       link: function(scope, element, attrs){
  //         console.log("I'm in the linking function");
  //       }
  //     }
  // }]);
