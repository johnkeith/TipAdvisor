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
  })
  .factory('tipGuideFac', function(){
    var tipGuide = [
      { id: 0, code: "us", name: "United States", avgTip: "15 - 20%", notes: "All service industries expect tipping." },
      { id: 1, code: "ca", name: "Canada", avgTip: "15 - 20%", notes: "All service industries expect tipping." },
      { id: 2, code: "gb", name: "United Kingdom", avgTip: "10 - 15%", notes: "Often service charges are included (look for an 'optional' charge on the bill). No tipping necessary at bars and pubs." },
      { id: 3, code: "ch", name: "Switzerland", avgTip: "15%", notes: "Almost all services include charge on bill, but a small tip at upscale establishments is acceptable and appreciated." },
      { id: 4, code: "de", name: "Germany", avgTip: "10 - 15%", notes: "Service at a restaurant usually necessitates tipping." },
      { id: 5, code: "tr", name: "Turkey", avgTip: "10%", notes: "Tipping in restaurants is customary, though only cash is accepted." }
    ];

    return {
      allCountries: function(){
        return tipGuide;
      }, 
      getById: function(id){
        return tipGuide[id];
      }
    }
  });
