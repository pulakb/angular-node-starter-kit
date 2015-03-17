// File Name: app.js
var cloudStbApp = angular.module('cloudStbApp', ['ui.router']);

cloudStbApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/guide");
  //
  // Now set up the states
  $stateProvider
    .state('guide', {
      url: "/guide",
      templateUrl: "templates/guide/guide.tpl.html",
      resolve: {
        channelData: function (data) {          
          return data.getChannelList();
        }
      },
      controller: 'guideController'
    });
});