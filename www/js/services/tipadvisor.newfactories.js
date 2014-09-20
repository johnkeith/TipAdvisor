angular.module('tipadvisor.newfactories', [])
  .factory('billFactory', function(){
    var bill = {
      dollars: "0",
      cents: "0"
    };

    return {
      getBill: function(){
        return bill;
      },
      getBillFloat: function(){
        return parseFloat(bill.dollars + "." + bill.cents);
      },
      setBillDollars: function(d){
        bill.dollars = d;
      },
      setBillCents: function(c){
        bill.cents = c;
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
        console.log(bill);
        console.log(tax.percent);
        tax.currency = bill * tax.percent;
      },
      setPercentFromCurrency: function(bill){
        tax.percent = tax.currency / bill;
      }
    };
  });
