angular.module('tipadvisor.newcontrollers', [])
  .controller('homeCtrl', ["$scope", "billFactory", "tipFactory", "taxFactory",
    function($scope, billFactory, tipFactory, taxFactory){
      $scope.bill = billFactory.getBill();
      $scope.tip = tipFactory.getTip();
      $scope.tax = taxFactory.getTax();

      $scope.calcTaxCur = function(){
        taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        console.log(taxFactory.getTax());
      };
      // YOU HAVE TO USE A DOT! OTHERWISE THE WATCH DOESN'T WORK
      // $scope.$watch('bill.dollars', function(n, o){
      //   console.log("watch firing");
      //   taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
      // });

      $scope.recalcTaxCurrency = function(){
        taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
      };
      $scope.recalcTaxPercent = function(){
        taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
      };

      // instead, place a watch on bill, tip, and tax
      // when those change, fire recalcs
      // define calcs in service for calculations
  }]);
