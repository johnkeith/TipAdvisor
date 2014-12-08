angular.module('tipadvisor.newfactories', [])
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])
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
      backspace: function(){
        if (bill.currency.charAt(bill.currency.length - 1) == "."){
          bill.currency = bill.currency.slice(0,-2);
          return true;
        }
        
        bill.currency = bill.currency.slice(0,-1);

        if (bill.currency.charAt(bill.currency.length - 1) == "."){
          bill.currency = bill.currency.slice(0,-1);
          return true;
        }
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(bill.currency)){
          return;
        }
        else if (btnVal === "0" && bill.currency.length === 0){
          return;
        }
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "." && bill.currency == ""){
          bill.currency = "0.";
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
  .factory('tipFactory', ['$localstorage', function($localstorage){
    var tip = {
      percent: $localstorage.get("tipPercent", null) || 0.15,
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
        else {
          tip.currency = "";
        }
      },
      setPercentFromCurrency: function(bill){
        if (bill == 0 || isNaN(bill)){
          return;
        };
        tip.percent = Math.abs(tip.currency / bill);
      },
      clear: function(){
        tip.percent = "";
        tip.currency = "";
      },
      backspace: function(){
      if (tip.currency.charAt(tip.currency.length - 1) == "."){
          tip.currency = tip.currency.slice(0,-2);
          return true;
        }
        
        tip.currency = tip.currency.slice(0,-1);

        if (tip.currency.charAt(tip.currency.length - 1) == "."){
          tip.currency = tip.currency.slice(0,-1);
          return true;
        }
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(tip.currency)){
          return;
        }
        else if (btnVal === "0" && tip.currency.length === 0){
          return;
        }
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "." && tip.currency == ""){
          tip.currency = "0.";
        }
        else if (btnVal === "."){
          tip.currency = tip.currency + ".";
        }
        else if (tip.currency.length < 7){
          tip.currency += btnVal;
        }
      }
    };
  }])
  .factory('taxFactory', ['$localstorage', function($localstorage){
    var tax = {
      percent: $localstorage.get("taxPercent", null) || "",
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
        tax.percent = Math.abs(tax.currency / (bill - tax.currency));
      }, 
      clear: function(){
        tax.percent = "";
        tax.currency = "";
      },
      backspace: function(){
       if (tax.currency.charAt(tax.currency.length - 1) == "."){
          tax.currency = tax.currency.slice(0,-2);
          return true;
        }
        
        tax.currency = tax.currency.slice(0,-1);

        if (tax.currency.charAt(tax.currency.length - 1) == "."){
          tax.currency = tax.currency.slice(0,-1);
          return true;
        }
      },
      input: function(btnVal, decimalPressed){
        var test = /\.\d{2}/;
        if(test.test(tax.currency)){
          return;
        }
        else if (btnVal === "0" && tax.currency.length === 0){
          return;
        }
        else if (btnVal === "." && decimalPressed === true){
          return;
        }
        else if (btnVal === "." && tax.currency == ""){
          tax.currency = "0.";
        }
        else if (btnVal === "."){
          tax.currency = tax.currency + ".";
        }
        else if (tax.currency.length < 7){
          tax.currency += btnVal;
        }
      }
    };
  }]);
