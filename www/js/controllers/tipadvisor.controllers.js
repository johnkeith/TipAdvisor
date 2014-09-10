angular.module("tipadvisor.controllers", [])
  .controller("tipCalcCtrl", ["$scope", "tipCalcFac", "$state", "$ionicGesture",
    function($scope, tipCalcFac, $state, $ionicGesture){
      // $scope.onSwipeRight = function(){
      //   $state.go('/settings');
      // };
      // $scope.onSwipeLeft = function(){
      //   $state.go('/guide');
      // };
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swiperight', function(e){
        $state.go('settings');
      }, element);

      $ionicGesture.on('swipeleft', function(e){
        $state.go('guide');
      }, element);

      $scope.btnInput = function(btnVal){
        if(btnVal == "C"){
          $scope.clearBill();
        }
        else if(btnVal == "."){
          $scope.centsPressed = true;
        }
        else if($scope.centsPressed == true && $scope.bill.cents.length < 2){
          $scope.bill.cents += btnVal;
        }
        else if($scope.centsPressed == false && $scope.bill.dollars.length < 8){
          $scope.bill.dollars += btnVal;
        }
        $scope.calcTotals();
      };
      $scope.calcTotals = function(){
        tipConverted = tipCalcFac.percentConvertor($scope.tip);
        billConverted = tipCalcFac.billConvertor($scope.bill);
        $scope.billWithTip = tipCalcFac.defaultCalc(billConverted, tipConverted);
        tipCalcFac.setBillWithTip($scope.billWithTip);
        $scope.tipInCur = $scope.billWithTip - billConverted;
        tipCalcFac.setTipInCur($scope.tipInCur);
      };
      $scope.clearBill = function(){
        // tipCalcFac.setBillDollars("0");
        // tipCalcFac.setBillCents("");
        // tipCalcFac.setCentsPressed(false);
        $scope.bill.dollars = "0";
        $scope.bill.cents = "";
        $scope.centsPressed = false;
      };
      // $scope.bill = {
      //   dollars: "0",
      //   cents: ""
      // };
      // $scope.tip = "15";
      // $scope.billWithTip = "0";
      // $scope.centsPressed = false;
      $scope.bill = tipCalcFac.getBill();
      $scope.tip = tipCalcFac.getTip();
      $scope.billWithTip = tipCalcFac.getBillWithTip();
      $scope.centsPressed = tipCalcFac.getCentsPressed();
      $scope.tipInCur = tipCalcFac.getTipInCur();
      $scope.$watch('tip', function(n, o){
        tipCalcFac.setTip(n);
      });
  }])
  .controller("tipGuideCtrl", ["$scope", "tipGuideFac", "$state", "$ionicGesture",
    function($scope, tipGuideFac, $state, $ionicGesture){
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swiperight', function(e){
        $state.go('calc');
      }, element);

      $scope.guide = tipGuideFac.allCountries();
  }])
  .controller("settingsCtrl", ["$scope", "$state", "$ionicGesture",
    function($scope, $state, $ionicGesture){
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swipeleft', function(e){
        $state.go('calc');
      }, element);
  }]);
