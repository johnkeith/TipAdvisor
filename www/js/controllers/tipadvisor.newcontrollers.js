angular.module('tipadvisor.newcontrollers', [])
  .controller('homeCtrl', ["$scope", "billFactory", "tipFactory", "taxFactory",
    function($scope, billFactory, tipFactory, taxFactory){
      $scope.bill = billFactory.getBill();
      $scope.tip = tipFactory.getTip();
      $scope.tax = taxFactory.getTax();
      $scope.total = 0;

      // YOU HAVE TO USE A DOT! OTHERWISE THE WATCH DOESN'T WORK
      // $scope.$watch('bill.dollars', function(n, o){
      //   console.log("watch firing");
      //   taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
      // });
      $scope.recalcTipCurrency = function(){
        tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
      };
      $scope.recalcTipPercent = function(){
        tipFactory.setPercentFromCurrency(billFactory.getBillFloat() - $scope.tax.currency);
      };

      $scope.recalcTaxCurrency = function(){
        taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
      };
      $scope.recalcTaxPercent = function(){
        taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
        tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
      };

      $scope.calcTotal = function(){
        $scope.total = $scope.bill.currency + $scope.tip.currency;
      };


  }]);
