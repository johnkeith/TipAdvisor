angular.module("tipadvisor.services", [])
  .factory('test', function(){
    var bill = {
      dollars: "15", 
      cents: "0"
    };

    return {
      getDollars: function(){
        return bill.dollars;
      },
      setDollars: function(d){
        console.log("d is " + d)
        bill.dollars = d;
        console.log("bill.dollars is now" + bill.dollars);
      }
    }
  })
  .factory('bill', function(){
    var bill = {
      dollars: "0",
      cents: ""
    };

    return {
      addDollars: function(d){
        this.dollars += d;
      },
      setDollars: function(d){
        this.dollars = d;
      },
      get: function(){
        return bill;
      },
      getAsString: function(){
        return bill.dollars + "." + bill.cents;
      },
      getAsFloat: function(){
        return parseFloat(this.getAsString());
      },
      addToDollars: function(d){
        bill.dollars += d;
      },
      addToCents: function(c){
        bill.cents += c;
      },
      clear: function(){
        bill.dollars = "0";
        bill.cents = "";
      },
      input: function(btnVal, decimalPressed){
        if (decimalPressed === true && bill.cents.length < 2){
          bill.cents += btnVal;
        }
        else if (decimalPressed === false && bill.dollars.length < 7){
          bill.dollars += btnVal;
        }
      }
    };
  })
  .factory('tax', function(){
    var tax = {
      defaultTaxPercent: "0",
      dollars: "0",
      cents: ""
    };

    return {
      get: function(){
        return tax;
      },
      getAsString: function(){
        return tax.dollars + "." + tax.cents;
      },
      getAsFloat: function(){
        return parseFloat(this.getAsString());
      },
      addToDollars: function(d){
        tax.dollars += d;
      },
      addToCents: function(c){
        tax.cents += c;
      },
      clear: function(){
        tax.dollars = "0";
        tax.cents = "";
      },
      setDefaultTax: function(d){
        tax.defaultTaxPercent = d;
      },
      calcAsPercent: function(b){
        if (b == 0){
          return 0;
        }
        else {
          return this.getAsFloat() / b * 100;
        }
      },
      input: function(btnVal, decimalPressed){
        if (decimalPressed === true && tax.cents.length < 2){
          tax.cents += btnVal;
        }
        else if (decimalPressed === false && tax.dollars.length < 7){
          tax.dollars += btnVal;
        }
      }
    };
  })
  .factory('tip', function(){
    var tip = {
      defaultTipPercent: "15.0",
      // will change to what is stored server side
      dollars: "0",
      cents: "",
      percent: "15"
    };

    return {
      get: function(){
        return tip;
      },
      getPercent: function(){
        return tip.percent;
      },
      setPercent: function(per){
        console.log("setting as " + per);
        tip.percent = per;
        console.log(tip.percent);
      },
      getAsString: function(){
        return tip.dollars + "." + tip.cents;
      },
      getAsFloat: function(){
        return parseFloat(this.getAsString());
      },
      addToDollars: function(i){
        tip.dollars += i;
      },
      addToCents: function(f){
        tip.cents += f;
      },
      clear: function(){
        tip.dollars = "0";
        tip.cents = "0";
      },
      calcAsPercent: function(b){
        if (b == 0){
          return 0;
        }
        else {
          return this.getAsFloat() / b * 100;
        }
      },
      setDefaultTip: function(d){
        defaultPercentTip = d;
      },
      input: function(btnVal, decimalPressed){
        if (decimalPressed === true && tip.cents.length < 2){
          tip.cents += btnVal;
        }
        else if (decimalPressed === false && tip.dollars.length < 7){
          tip.dollars += btnVal;
        }
      }
    };
  })


  .factory('tipCalcFac', function(){
    var calc = {
      bill: { dollars: "0", cents: ""},
      tip: "15",
      billWithTip: "0",
      tipInCur: "0",
      centsPressed: false
    };

    return {
      getBill: function(){
        return calc.bill;
      }, 
      setBillDollars: function(d){
        calc.bill.dollars = d;
      },
      setBillCents: function(c){
        calc.bill.cents = c;
      },
      getTip: function(){
        return calc.tip;
      },
      setTip: function(t){
        calc.tip = t;
      }, 
      getBillWithTip: function(){
        return calc.billWithTip;
      }, 
      setBillWithTip: function(bwt){
        calc.billWithTip = bwt;
      },
      getTipInCur: function(){
        return calc.tipInCur;
      },
      setTipInCur: function(tic){
        calc.tipInCur = tic;
      }, 
      getCentsPressed: function(){
        return calc.centsPressed;
      },
      setCentsPressed: function(bool){
        calc.centsPressed = bool;
      },
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
      defaultCalc: function(bill, tipPercent, tax){
        bill -= tax
        return bill += bill * tipPercent;
      }
    }
  })
  .factory('tipGuideFac', function(){
    var tipGuide = [
      { id: 0, code: "us", name: "United States", avgTip: "15 - 20%", notes: "All service industries expect tipping." },
      { id: 1, code: "ca", name: "Canada", avgTip: "15 - 20%", notes: "All service industries expect tipping." },
      { id: 2, code: "gb", name: "United Kingdom", avgTip: "10 - 15%", notes: "Often service charges are included (look for an 'optional' charge on the bill). No tipping necessary at bars and pubs." },
      { id: 3, code: "ch", name: "Switzerland", avgTip: "15%", notes: "Almost all services include a charge on bill, but a small tip at upscale establishments is acceptable and appreciated." },
      { id: 4, code: "de", name: "Germany", avgTip: "10 - 15%", notes: "Service at a restaurant usually necessitates tipping." },
      { id: 5, code: "tr", name: "Turkey", avgTip: "10%", notes: "Tipping in restaurants is customary, though only cash is accepted." },  
      { id: 6, code: "it", name: "Italy", avgTip: "10%", notes: "No more than 10% tip is required. No need, however, to tip gondoliers when riding the canals of Venice." },
      { id: 7, code: "cn", name: "China", avgTip: "0%", notes: "Tipping is not customary in China." },
      { id: 8, code: "jp", name: "Japan", avgTip: "0%", notes: "Tipping is not customary in Japan." },
      { id: 9, code: "kr", name: "South Korea", avgTip: "0%", notes: "Tipping is not customary in South Korea." },
      { id: 10, code: "au", name: "Australia", avgTip: "10 - 15%", notes: "While tipping was not always a common practice here, now a small tip for good service is the general rule." },
      { id: 11, code: "in", name: "India", avgTip: "15%", notes: "Often, a 10% service charge will be included, but be sure to leave a tip if that is not the case." },
      { id: 12, code: "eg", name: "Egypt", avgTip: "5 - 10%", notes: "Service professional appreciate a small tip added to the charge already included in the bill." },
      { id: 13, code: "br", name: "Brazil", avgTip: "0%", notes: "Tipping is not customary in Brazil, though restaurants often charge a 10% service fee." },
      { id: 14, code: "fr", name: "France", avgTip: "10%", notes: "Most services include a tip in the bill and tourists are not expected to tip, though locals often leave an extra 10% at restaurants." },
      { id: 15, code: "ar", name: "Argentina", avgTip: "10%", notes: "Generally, tipping is not customary, though it is recommended in upscale restaurants." },
      { id: 16, code: "mx", name: "Mexico", avgTip: "10 - 15%", notes: "Tipping is expected and dollars are accepted." }
    ];

    return {
      allCountries: function(){
        return tipGuide;
      },
      getById: function(id){
        return tipGuide[id];
      }
    };
  })
  .factory('taxPercent', function(){
    var taxInfo = {
      ints: "", 
      fracts: "", 
      subTax: false
    };
    return {
      getTaxPer: function(){
        return taxInfo;
      },
      taxForBill: function(bill){
        percent = parseFloat(taxInfo.ints + "." + taxInfo.fracts) / 100;
        if (isNaN(percent) || percent === 0){
          return 0
        }
        else {
          return bill * percent;
        }
      },
      conToString: function(){
        if (taxInfo.ints === "" && taxInfo.fracts === ""){
          return "0.0";
        }
        else if (taxInfo.ints === "" && taxInfo.fracts !== "") {
          return "0." + taxInfo.fracts;
        }
        else if (taxInfo.ints !== "" && taxInfo.fracts === "") {
          return taxInfo.ints + ".0";
        }
        else {
          return taxInfo.ints + "." + taxInfo.fracts;
        }
      }
    };
  });
