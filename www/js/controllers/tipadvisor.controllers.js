angular.module("tipadvisor.controllers", [])
  .controller("tipCalcCtrl", ["$scope", "tipCalcFac", "$state", "$ionicGesture", "taxPercent",
    function($scope, tipCalcFac, $state, $ionicGesture, taxPercent){
      var element = angular.element(document.querySelector('body'));
      
      $ionicGesture.on('swipeleft', function(e){
        $state.go('settings');
      }, element);

      $ionicGesture.on('swiperight', function(e){
        $state.go('guide');
      }, element);

      $scope.calcVisible = true;
      $scope.centsPressed = false;
      // making centsPressed a global scope var b/c it needs to be
      // accessed by both services

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
        else if($scope.centsPressed == false && $scope.bill.dollars.length < 7){
          $scope.bill.dollars += btnVal;
        }
        $scope.calcTotals();
      };

      $scope.calcTotals = function(){
        tipConverted = tipCalcFac.percentConvertor($scope.tip);
        billConverted = tipCalcFac.billConvertor($scope.bill);
        taxAmount = taxPercent.taxForBill(billConverted);

        $scope.billWithTip = tipCalcFac.defaultCalc(billConverted, tipConverted, taxAmount);
        tipCalcFac.setBillWithTip($scope.billWithTip);
        
        $scope.tipInCur = $scope.billWithTip - billConverted;
        tipCalcFac.setTipInCur($scope.tipInCur);

        console.log(tipConverted);
        console.log(billConverted);
        console.log(taxAmount);
        console.log($scope.billWithTip);
        console.log($scope.tipInCur);
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

      $scope.taxPerConverted = taxPercent.conToString();
      $scope.updateTaxPerConverted = function(){
        $scope.taxPerConverted = taxPercent.conToString();
      }
      // NEED TO FIGURE OUT WHY SCOPE WATCH IS NOT REFIRING THE FUNC TO CONVERT TO A STRING

      $scope.btnInput = function(btnVal){
        if(btnVal == "C"){
          $scope.clearTaxPer();
        }
        else if(btnVal == "."){
          $scope.decPressed = true;
        }
        else if($scope.decPressed == true && $scope.taxPer.fracts.length < 3){
          $scope.taxPer.fracts += btnVal;
        }
        else if($scope.decPressed == false && $scope.taxPer.ints.length < 2){
          $scope.taxPer.ints += btnVal;
        }
        $scope.updateTaxPerConverted();
      };
      $scope.decPressed = false;
      $scope.clearTaxPer = function(){
        $scope.taxPer.ints = "";
        $scope.taxPer.fracts = "";
        $scope.decPressed = false;
      };
  }])
  .controller("testCtrl", ["$scope", "bill", "tax", "tip",
    function($scope, bill, tax, tip){
      $scope.bill = bill.get();
      $scope.tip = tip.get();
      $scope.tipAsPercent = tip.convertTipToPercent();

      $scope.addDollars = function(d){
        bill.addToInts(d)
      };
      $scope.addCents = function(c){
        bill.addToFracts(c);
      };
  }])
  .controller('sliderView', ["$scope", "bill", "tip", "tax", 
    function($scope, bill, tip, tax){
      // Testing scopes
      $scope.bill = bill.get();
      $scope.tip = tip.get();
      $scope.tax = tax.get();
      // 

      // keep track of slider position
      $scope.activeSection = 0;
      $scope.slideHasChanged = function(i){
        $scope.activeSection = i;
      };

      // init scopes
      $scope.billAsCurrency = bill.getAsString();
      $scope.tipAsCurrency = tip.getAsString();
      $scope.tipAsPercent = tip.calcTipOfBillAsPercent($scope.billAsCurrency);
      $scope.taxAsCurrency = tax.getAsString();
      $scope.taxAsPercent = tax.calcTaxOfBillAsPercent($scope.billAsCurrency);

      $scope.calcTip = function(){
        $scope.tipAsCurrency = tip.getAsString();
        $scope.tipAsPercent = tip.calcTipOfBillAsPercent($scope.billAsCurrency);
      };

      $scope.calcTax = function(){
        $scope.taxAsCurrency = tax.getAsString();
        $scope.taxAsPercent = tax.calcTaxOfBillAsPercent($scope.billAsCurrency);
      };

      $scope.calcBill = function(){
        $scope.billAsCurrency = bill.getAsString();
      };

      $scope.calcTotal = function(){
        $scope.total = "lots of methods!"
      }

      $scope.decimalPressed = false;
      $scope.btnInput = function(b){
        bill.addToDollars(b);
        $scope.calcBill();
      };


      $scope.insertTestData = function(){
        $scope.bill.dollars = "20";
        $scope.bill.cents = "20";
        $scope.tip.dollars = "3";
        $scope.tip.cents = "8";
        $scope.tax.dollars = "1";
        $scope.tax.cents = "4";
        $scope.calcBill();
        $scope.calcTip();
        $scope.calcTax();
      };
  }]);
