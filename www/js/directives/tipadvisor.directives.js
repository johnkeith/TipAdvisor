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
  }])
  .directive('preventDrag', ["$ionicGesture", "$ionicSlideBoxDelegate", 
    function($ionicGesture, $ionicSlideBoxDelegate) {
    return {
      restrict :  'A',
      link : function(scope, elem, attrs, e) {
        var reportEvent = function (e){
          if  (e.target.tagName.toLowerCase() == 'input'){
            $ionicSlideBoxDelegate.enableSlide(false);
          }
          else{
            $ionicSlideBoxDelegate.enableSlide(true);
          }
        };
        $ionicGesture.on('dragstart', reportEvent, elem);
        $ionicGesture.on('touchstart', reportEvent, elem);
      }
    };
  }])
  .directive('inputonlynumstwodec',
    function(){
      return {
        restrict: "A",
        scope: {},
        link: function(scope, element, attrs) {
          element.on('keypress', function(e){
            console.log("The decPressed equals" + $scope.decPressed);
            console.log("The charCode is " + e.charCode);
            console.log("The keyCode is " + e.keyCode);
            if (e.charCode === 46) {
              if ($scope.decPressed === true){
                console.log("Dec. pressed second time");
                e.preventDefault();
              } else {
                $scope.decPressed = true;
              }
            };
          });
        }
      };
  });
  // .directive('forcePrecision', function () {
  //   return {
  //       restrict: 'A',
  //       scope: {
  //          step: '@'
  //       },
  //       link: function (scope, element, attrs) {
  //           if (!scope.step || scope.step == 'any') {
  //              return;
  //           }

  //           var prec = 1;
  //           for (var i = scope.step; i != 1; i *= 10) {
  //               prec *= 10;
  //           }

  //           element.on('keypress', function (e) {
  //               var val = Number(element.val() + (e.charCode !== 0  ? String.fromCharCode(e.charCode) : ''));

  //               if (val) {
  //                   var newVal = Math.floor(val * prec) / prec;

  //                   if (val != newVal) {
  //                       e.preventDefault();
  //                   }
  //               }
  //           });
  //       }
  //   };
  // });
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
