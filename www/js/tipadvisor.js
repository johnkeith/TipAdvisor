// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('tipAdvisor', [
  'ionic',
  // 'ngCordova',
  'tipadvisor.directives',
  'tipadvisor.newcontrollers', 
  'tipadvisor.newfactories',
  // 'tipadvisor.providers'
  'tipadvisor.filters'
  ])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    'use strict';
    
    $stateProvider
      .state('calc', {
        url: '/calc',
        templateUrl: "./templates/tipCalc.html"
      })
      .state('guide', {
        url: '/guide',
        templateUrl: "./templates/tipGuide.html"
      })
      .state('settings', {
        url: '/settings',
        templateUrl: "./templates/settings.html"
      })
      .state('test', {
        url: '/test', 
        templateUrl: "./templates/test.html"
      })
      .state('slider', {
        url: '/slider',
        templateUrl: "./templates/slider.html"
      })
      .state('newhome', {
        url: '/', 
        templateUrl: "./templates/newhome.html"
      })
    $urlRouterProvider.otherwise('/');
  }
])

.run(['$ionicPlatform', '$rootScope', '$localstorage',
  function($ionicPlatform, $rootScope, $localstorage) {
    $ionicPlatform.ready(function() {
      // dealing with splash screen hiding 
      // http://forum.ionicframework.com/t/white-page-showing-after-splash-screen-before-app-load/2908/9
      // the below is not working.....
      // $timeout(function(){
      //   $cordovaSplashscreen.hide();
      // }, 5000, false);
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
]);
