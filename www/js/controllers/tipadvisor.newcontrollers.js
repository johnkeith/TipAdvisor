angular.module('tipadvisor.newcontrollers', [])
  .controller('homeCtrl', ["$scope", "billFactory", "tipFactory", "taxFactory", "$animate",
    function($scope, billFactory, tipFactory, taxFactory, $animate){
      $scope.bill = billFactory.getBill();
      $scope.tip = tipFactory.getTip();
      $scope.tax = taxFactory.getTax();
      $scope.total = 0;

      // YOU HAVE TO USE A DOT! OTHERWISE THE WATCH DOESN'T WORK
      // $scope.$watch('bill.dollars', function(n, o){
      //   console.log("watch firing");
      //   taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
      // });

      $scope.activePanel = 0;
      $scope.changeActivePanel = function(panel){
        if(panel === $scope.activePanel){
          return
        } else {
          currentActive = angular.element(document.getElementById('panel-' + $scope.activePanel));
          newActive = angular.element(document.getElementById('panel-' + panel));
          $animate.removeClass(currentActive, 'active-panel');
          $animate.addClass(newActive, 'active-panel');
          $scope.activePanel = panel;

          $scope.decimalPressed = false;
        };
      };

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
        bill = parseFloat($scope.bill.currency) || 0;
        tip = parseFloat($scope.tip.currency) || 0;
        $scope.total = bill + tip;
      };

      $scope.calcAll = function(){
        if($scope.tax.currency == 0){
          taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        } else if($scope.tax.percent == 0){
          taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
        } else {
          taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        };

        if($scope.tip.currency == 0){
          tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
        } else if($scope.tip.percent == 0){
          console.log("setting percent from currency");
          tipFactory.setPercentFromCurrency(billFactory.getBillFloat() - $scope.tax.currency);
        } else {
          tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
        };

        $scope.calcTotal();
      };

      $scope.decimalPressed = false;

      $scope.clearActiveSection = function(){
        switch($scope.activePanel) {
          case 0:
            billFactory.clear();
            $scope.calcAll();
            break;
          case 1:
            tipFactory.clear();
            $scope.calcAll();
            break;
          case 2:
            taxFactory.clear();
            $scope.calcAll();
            break;
        }
        $scope.decimalPressed = false;
      };

      $scope.btnInput = function(btnVal){
        if (btnVal == "C"){
          $scope.clearActiveSection();
        }
        else if ($scope.activePanel === 0){
          billFactory.input(btnVal, $scope.decimalPressed);
          $scope.calcAll();
        }
        else if ($scope.activePanel === 1){
          tipFactory.input(btnVal, $scope.decimalPressed);
          $scope.recalcTipPercent();
          $scope.calcTotal();
        }
        else if ($scope.activePanel === 2){
          taxFactory.input(btnVal, $scope.decimalPressed);
          taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
          tipFactory.setPercentFromCurrency(billFactory.getBillFloat() - $scope.tax.currency);
          $scope.calcTotal();
        };

        if (btnVal == "."){
          $scope.decimalPressed = true;
        };

      };


      // keep track of slider position
      // $scope.activeSection = 0;
      // $scope.decimalPressed = false;
      
      // $scope.slideHasChanged = function(i){
      //   $scope.activeSection = i;
      //   $scope.decimalPressed = false;
      //   var el = document.getElementById('calc')
      //   if (i === 3){
      //     $animate.addClass(el , 'hidden-calc');
      //   } else {
      //     $animate.removeClass(el, 'hidden-calc');
      //   }
      // };

      // $scope.clearActiveSection = function(){
      //   switch($scope.activeSection) {
      //     case 0:
      //       billFactory.clear();
      //       $scope.calcAll();
      //       break;
      //     case 1:
      //       tipFactory.clear();
      //       $scope.calcAll();
      //       break;
      //     case 2:
      //       taxFactory.clear();
      //       $scope.calcAll();
      //       break;
      //   }
      // };

      // $scope.btnInput = function(btnVal){
      //   if (btnVal == "."){
      //     $scope.decimalPressed = true;
      //   };

      //   if (btnVal == "C"){
      //     $scope.clearActiveSection();
      //   }
      //   else if ($scope.activeSection === 0){
      //     billFactory.input(btnVal, $scope.decimalPressed);
      //     $scope.calcAll();
      //   }
      //   else if ($scope.activeSection === 1){
      //     tip.input(btnVal, $scope.decimalPressed);
      //     $scope.calcTip();
      //   }
      //   else if ($scope.activeSection === 2){
      //     tax.input(btnVal, $scope.decimalPressed);
      //     $scope.calcTax();
      //   }
      // };
  }]);
