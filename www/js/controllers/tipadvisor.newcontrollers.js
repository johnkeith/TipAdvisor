angular.module('tipadvisor.newcontrollers', [])
  .controller('homeCtrl', ["$scope", "billFactory", "tipFactory", "taxFactory",
    function($scope, billFactory, tipFactory, taxFactory){
      $scope.bill = billFactory.getBill();
      $scope.tip = tipFactory.getTip();
      $scope.tax = taxFactory.getTax();
  }]);
