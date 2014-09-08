angular.module("tipadvisor.controllers", [])
  .controller("tipCalcCtrl", ["$scope", "tipCalcFac",
    function($scope, tipCalcFac){
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
        $scope.tipInCur = $scope.billWithTip - billConverted;
      };
      $scope.clearBill = function(){
        $scope.bill.dollars = "0";
        $scope.bill.cents = "";
        $scope.centsPressed = false;
      };
      $scope.bill = {
        dollars: "0",
        cents: ""
      };
      $scope.tip = "15";
      $scope.billWithTip = "0";
      $scope.centsPressed = false;
  }]);
