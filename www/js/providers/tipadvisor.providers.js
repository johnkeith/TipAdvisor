angular.module('tipadvisor.providers', [])
  .provider('ngRecord', function(){
    // assigned with the connectToDb method
    // need error system to notify
    var db;

    this.dbName;

    var connectToDb = function(){
      db = $cordovaSQLite.openDB({
        name: this.dbName + ".db"
      });
    };

    var createTable = function(tableName, schemaObj){
      // table name is a string, schema is an obj with name as key and type as value; 
      // first in obj is assumed to be primary key
      // sqllite data types are Integer, Real, Text, Blob
      // realized we can pass primary key as part of a value string
      // schemaObj = { id: "integer primary key", something: "else" }
      var attrsStr = '';

      for(var key in schemaObj){
        attrsStr = attrsStr + " " + key + " " + schemaObj[key] + ", "
      };

      attrsStr.substr(0, attrsStr.length - 2)

      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS " + tableName + " (" + attrsStr + ")");
    };

    this.$get = ["$cordovaSQLite", function($cordovaSQLite){
      return {
        connectToDb: connectToDb(),
        createTable: createTable()
      }
    };
    // create tables
    
    // query tables (select)
    // insert data

    // alter tables
    // return schema
  }]);
