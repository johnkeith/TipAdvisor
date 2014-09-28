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
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "."){
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
        if(tip.percent != 0){
          tip.currency = bill * tip.percent || "";
          tip.currency = tip.currency.toString();
        }
      },
      setPercentFromCurrency: function(bill){
        if (bill == 0 || isNaN(bill)){
          return;
        };
        tip.percent = tip.currency / bill;
      },
      clear: function(){
        tip.percent = "";
        tip.currency = "";
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(tip.currency)){
          return;
        }
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "."){
          tip.currency = tip.currency + ".";
        }
        else if (tip.currency.length < 7){
          tip.currency += btnVal;
        }
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
        if(tax.percent != 0){
          tax.currency = bill * tax.percent || "";
          tax.currency = tax.currency.toString();
        }
      },
      setPercentFromCurrency: function(bill){
        if (bill == 0 || isNaN(bill)){
          return;
        };
        tax.percent = tax.currency / bill;
      }, 
      clear: function(){
        tax.percent = "";
        tax.currency = "";
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(tax.currency)){
          return;
        }
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "."){
          tax.currency = tax.currency + ".";
        }
        else if (tax.currency.length < 7){
          tax.currency += btnVal;
        }
      }
    };
  });
