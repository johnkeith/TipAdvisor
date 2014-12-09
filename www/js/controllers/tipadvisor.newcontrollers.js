angular.module('tipadvisor.newcontrollers', [])
  .controller('homeCtrl', ["$scope", "billFactory", "tipFactory", "taxFactory", "$animate", "$localstorage", "$window", "$ionicModal",
    function($scope, billFactory, tipFactory, taxFactory, $animate, $localstorage, $window, $ionicModal){
      // set window color on load
      windowcolor = $localstorage.getObject('windowcolor');
      pane = angular.element($window.document.getElementsByClassName('pane'));

      if (windowcolor.length != 0){
        pane.css('background', 'linear-gradient(to bottom,' + windowcolor['colorOne'] + ',' + windowcolor['colorTwo'] + ')');
      }

      pane.css('visibility', 'visible');

      $ionicModal.fromTemplateUrl("./templates/info.html", function(modal){
        $scope.modal = modal;
      }, {
        scope: $scope, 
        animation: 'slide-in-up'
      });

      $scope.bill = billFactory.getBill();
      $scope.tip = tipFactory.getTip();
      $scope.tax = taxFactory.getTax();
      $scope.total = 0;
      
      $scope.defaultColorOne = 'rgba(30, 139, 195, 1)';
      $scope.defaultColorTwo = 'rgba(42, 187, 155, 1)';

      console.log($localstorage.get('taxPercent'));
      console.log($localstorage.get('tipPercent'));
      
      // YOU HAVE TO USE A DOT! OTHERWISE THE WATCH DOESN'T WORK
      // $scope.$watch('bill.dollars', function(n, o){
      //   console.log("watch firing");
      //   taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
      // });

      $scope.getRandomColors = function(){
        shades = ['green', 'orange', 'blue', 'purple']
        randomShade = shades[Math.floor(Math.random()*shades.length)];
        
        $scope.colorOne = randomColor({hue: randomShade, luminosity: 'bright'})
        $scope.colorTwo = randomColor({hue: randomShade, luminosity: 'bright'})
      };

      $scope.changeBGColor = function(opts){
        pane = angular.element($window.document.getElementsByClassName('pane'));
        
        if (opts['fromDefaults'] == true){
          pane.css('background', 'linear-gradient(to bottom,' + $scope.defaultColorOne + ',' + $scope.defaultColorTwo + ')');
        }
        else {
          $scope.getRandomColors();
          pane.css('background', 'linear-gradient(to bottom,' + $scope.colorOne + ',' + $scope.colorTwo + ')');
        };
      };

      // need to pass default function stuff
      $scope.saveBGColor = function(opts){
        if (opts['fromDefaults'] == true){
          $localstorage.setObject('windowcolor', {
            colorOne: $scope.defaultColorOne,
            colorTwo: $scope.defaultColorTwo
          });
        } 
        else {
          $localstorage.setObject('windowcolor', {
            colorOne: $scope.colorOne,
            colorTwo: $scope.colorTwo
          });
        };
      }

      // NEED TO REFACTOR INTO DIRECTIVES
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

        // sliderPanel = angular.element(document.getElementById('panel-4'));
        // tipSlider = angular.element(document.getElementById('tip-slider'));
        // taxSlider = angular.element(document.getElementById('tax-slider'));

        // if (panel === 0){
        //   $animate.removeClass(sliderPanel, 'panel-visible');
        //   $animate.removeClass(tipSlider, 'slider-visible');
        //   $animate.removeClass(taxSlider, 'slider-visible');
        // } else if (panel === 1){
        //   $animate.addClass(sliderPanel, 'panel-visible');
        //   $animate.removeClass(taxSlider, 'slider-visible');
        //   $animate.addClass(tipSlider, 'slider-visible');
        // } else if (panel === 2){
        //   $animate.addClass(sliderPanel, 'panel-visible');
        //   $animate.removeClass(tipSlider, 'slider-visible');
        //   $animate.addClass(taxSlider, 'slider-visible');
        // };

        $scope.clearQueued = true;
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
        $localstorage.set('tipPercent', $scope.tip.percent);
        $localstorage.set('taxPercent', $scope.tax.percent);
      };

      $scope.tipSetWithBtn = false;
      $scope.taxSetWithBtn = false;

      $scope.calcAll = function(){
        if($scope.taxSetWithBtn === true){
          taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
        } else if($scope.tax.currency == 0){
          taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        } else if($scope.tax.percent == 0){
          taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
        } else {
          taxFactory.setCurrencyFromPercent(billFactory.getBillFloat());
        };

        if($scope.tipSetWithBtn === true){
          tipFactory.setPercentFromCurrency(billFactory.getBillFloat() - $scope.tax.currency);
        } else if($scope.tip.currency == 0){
          tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
        } else if($scope.tip.percent == 0){
          tipFactory.setPercentFromCurrency(billFactory.getBillFloat() - $scope.tax.currency);
        } else {
          tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
        };

        $scope.calcTotal();
      };

      $scope.decimalPressed = false;
      $scope.clearQueued = false;
      $scope.sliderPressed = false;

      $scope.sliderUsed = function(slider){
        if(slider === "1"){
          $scope.tipSetWithBtn = false;
        } else if(slider === "2"){
          $scope.taxSetWithBtn = false;
        };
        $scope.sliderPressed = true;
      };
      
      $scope.clearActiveSection = function(){
        switch($scope.activePanel) {
          case 0:
            billFactory.clear();
            $scope.calcAll();
            break;
          case 1:
            tipFactory.clear();
            $scope.tipSetWithBtn = false;
            $scope.calcAll();
            break;
          case 2:
            taxFactory.clear();
            $scope.taxSetWithBtn = false;
            $scope.calcAll();
            break;
        }
        $scope.decimalPressed = false;
        $scope.clearQueued = false;
        $scope.sliderPressed = false;
      };

      $scope.backspaceSection = function(){
        switch($scope.activePanel) {
          case 0:
            if (billFactory.backspace() == true){
              $scope.decimalPressed = false;
            };
            break;
          case 1:
            if (tipFactory.backspace() == true){
              $scope.decimalPressed = false;
            };
            break;
          case 2:
            if (taxFactory.backspace() == true){
              $scope.decimalPressed = false;
            };
            break;
        }
        $scope.calcAll();
      };

      $scope.clearAll = function(){
        billFactory.clear();
        tipFactory.clear();
        taxFactory.clear();

        $scope.tipSetWithBtn = false;
        $scope.taxSetWithBtn = false;
        $scope.decimalPressed = false;

        $scope.calcAll();
        $scope.$broadcast('scroll.refreshComplete');
      };

      $scope.btnInput = function(btnVal){
        if ($scope.clearQueued === true || $scope.sliderPressed === true){
          $scope.clearActiveSection();
        };

        if (btnVal == "C"){
          $scope.backspaceSection();
        }
        else if ($scope.activePanel === 0){
          billFactory.input(btnVal, $scope.decimalPressed);
          $scope.calcAll();
        }
        else if ($scope.activePanel === 1){
          tipFactory.input(btnVal, $scope.decimalPressed);
          $scope.tipSetWithBtn = true;
          $scope.recalcTipPercent();
          $scope.calcTotal();
        }
        else if ($scope.activePanel === 2){
          taxFactory.input(btnVal, $scope.decimalPressed);
          taxFactory.setPercentFromCurrency(billFactory.getBillFloat());
          tipFactory.setCurrencyFromPercent(billFactory.getBillFloat() - $scope.tax.currency);
          $scope.taxSetWithBtn = true;
          $scope.calcTotal();
        };

        if (btnVal == "."){
          $scope.decimalPressed = true;
        };

      };
  }]);
