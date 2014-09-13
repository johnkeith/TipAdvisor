angular.module("tipadvisor.controllers", [])
  .controller("tipCalcCtrl", ["$scope", "tipCalcFac", "$state", "$ionicGesture",
    function($scope, tipCalcFac, $state, $ionicGesture, calcTemplate){
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swipeleft', function(e){
        $state.go('settings');
      }, element);

      $ionicGesture.on('swiperight', function(e){
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
        $scope.bill.dollars = "0";
        $scope.bill.cents = "";
        $scope.centsPressed = false;
      };

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
      
      $ionicGesture.on('swipeleft', function(e){
        $state.go('calc');
      }, element);

      $scope.guide = tipGuideFac.allCountries();
  }])

  .controller("settingsCtrl", ["$scope", "$state", "$ionicGesture", "taxPercent",
    function($scope, $state, $ionicGesture, taxPercent){
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swiperight', function(e){
        $state.go('calc');
      }, element);

      $scope.taxPer = taxPercent.getTaxPer(); 
      $scope.btnInput = function(btnVal){
        if(btnVal == "C"){
          $scope.clearTaxPer();
        }
        else if(btnVal == "."){
          $scope.decPressed = true;
        }
        else if($scope.decPressed == true && $scope.taxPer.fracts.length < 4){
          $scope.taxPer.fracts += btnVal;
        }
        else if($scope.decPressed == false && $scope.taxPer.ints.length < 3){
          $scope.taxPer.ints += btnVal;
        }
      };
      $scope.decPressed = false;
      $scope.clearTaxPer = function(){
        $scope.taxPer.ints = "0";
        $scope.taxPer.fracts = "0";
        $scope.decPressed = false;
      };
  }]);
