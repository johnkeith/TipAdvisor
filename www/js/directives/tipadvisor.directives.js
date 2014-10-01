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
            var validKeys = [48,49,50,51,52,53,54,55,56,57];

            if (element.val() === ""){ scope.decPressed = false; };

            if (e.charCode === 46 || e.charCode === 110) {
              if (scope.decPressed === true){
                e.preventDefault();
              } else {
                scope.decPressed = true;
              };
            } else if (scope.decPressed === true){
              var test = /\.\d{2}/;
              if(test.test(element.val())){
                e.preventDefault();
              } else if(validKeys.indexOf(e.charCode) === -1){
                e.preventDefault();
              };
            } else if(validKeys.indexOf(e.charCode) === -1){
              e.preventDefault();
            }
          });
        }
      };
  });
