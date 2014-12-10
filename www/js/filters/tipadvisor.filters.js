angular.module('tipadvisor.filters', [])
  .filter('percent', function(){
    return function(input){
      if (input == ">= 100"){
        return ">= 100";
      }
      else if (isNaN(input) == true){
        return "0.00";
      }
      else if (input == "") {
        return "0.00";
      }
      else {
        return (Math.round((parseFloat(input) * 100) * 100) / 100).toFixed(2);
      };
    }
  });
