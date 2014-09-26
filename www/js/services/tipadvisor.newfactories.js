angular.module('tipadvisor.newfactories', [])
  .factory('billFactory', function(){
    var bill = {
      currency: ""
    };

    return {
      getBill: function(){
        return bill;
      },
      getBillFloat: function(){
        return parseFloat(bill.currency);
      },
      clear: function(){
        bill.currency = "";
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(bill.currency)){
          return;
        }
        else if (btnVal === "."){
          console.log("dec pressed");
          bill.currency = bill.currency + ".";
        }
        else if (bill.currency.length < 7){
          bill.currency += btnVal;
        }
      }
    };
  })
  .factory('tipFactory', function(){
    var tip = {
      percent: "",
      currency: ""
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
      },
      clear: function(){
        tip.percent = "";
        tip.currency = "";
      }
    };
  })
  .factory('taxFactory', function(){
    var tax = {
      percent: "",
      currency: ""
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
      }, 
      clear: function(){
        tax.percent = "";
        tax.currency = "";
      }
    };
  });
