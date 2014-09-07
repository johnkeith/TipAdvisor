angular.module("tipadvisor.services", [])
  .factory('tipCalcFac', function(){
    return {
      percentConvertor: function(percent){
        percent = parseFloat(percent);

        if(percent < 0){
          return Math.abs(percent);
        }
        else if(percent >= 1){
          return percent / 100;
        }
        return percent;
      },
      billConvertor: function(billObj) {
        bill = billObj.dollars + "." + billObj.cents;
        return parseFloat(bill);
      },
      defaultCalc: function(bill, percent){
        bill = parseFloat(bill);
        return bill += bill * percent;
      }
    }
  });
