angular.module('tipadvisor.newfactories', [])
  .factory('billFactory', function(){
    var bill = {
      currency: "0"
    };

    return {
      getBill: function(){
        return bill;
      },
      getBillFloat: function(){
        return parseFloat(bill.currency);
      }
    };
  })
  .factory('tipFactory', function(){
    var tip = {
      percent: "0",
      currency: "0"
    };

    return {
      getTip: function(){
        return tip;
      },
      setTip: function(p){
        tip.percent = p;
      },
      setCurrency: function(c){
        tip.currency = c;
      },
      setCurrencyFromPercent: function(bill){
        tip.currency = bill * tip.percent;
      },
      setPercentFromCurrency: function(bill){
        tip.percent = tip.currency / bill;
      }
    };
  })
  .factory('taxFactory', function(){
    var tax = {
      percent: "0",
      currency: "0"
    };

    return {
      getTax: function(){
        return tax;
      },
      setTip: function(p){
        tax.percent = p
      },
      setCurrency: function(c){
        tax.currency = c;
      }, 
      setCurrencyFromPercent: function(bill){
        tax.currency = bill * tax.percent;
      },
      setPercentFromCurrency: function(bill){
        if (bill == 0){
          return;
        };
        tax.percent = tax.currency / bill;
      }
    };
  });
