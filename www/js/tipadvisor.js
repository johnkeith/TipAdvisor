// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tipAdvisor', [
  'ionic',
  'tipadvisor.controllers',
  'tipadvisor.services'
  ])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    'use strict';
    $stateProvider
      .state('calc', {
        url: '/',
        templateUrl: "./templates/tipCalc.html"
      })
      .state('guide', {
        url: '/guide',
        templateUrl: "./templates/guide.html"
      });
    $urlRouterProvider.otherwise('/');
  }
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
