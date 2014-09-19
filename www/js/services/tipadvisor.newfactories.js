angular.module('tipadvisor.newfactories', [])
  .factory('billFactory', function(){
    var bill = {
      dollars: "",
      cents: ""
    };

    return {
      getBill: function(){
        return bill;
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
      percent: "0"
    };

    return {
      getTip: function(){
        return tip;
      },
      setTip: function(p){
        tip.percent = p;
      }
    }

  })
  .factory('taxFactory', function(){
    var tax = {
      percent: "0"
    };

    return {
      getTax: function(){
        return tax;
      },
      setTip: function(p){
        tax.percent = p
      }
    }
  });
