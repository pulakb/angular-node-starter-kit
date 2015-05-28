'use strict';
/*
* @Description: Main Application file. Define all states here.
*
* */

var angApp = angular.module('angApp', ['ui.router']);

angApp.config(function($stateProvider, $urlRouterProvider) {

    var states = [];

    states.push({   name: 'header',
        url: '/',

        views: {
        '@':   { templateUrl: 'templates/partials/header.tpl.html',
                 controller: function () {}
               }
        }
    });

    // tab
    states.push({   name: 'header.home',
        url: '',
        views: { 'viewName':
                    { templateUrl: ''}
        },
        resolve: {
        },
        deepStateRedirect: true,
        sticky: true
    });

    states.push({ name: 'header.signup',
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {
        }
    });

    states.push({ name: 'header.signout',
        url: '',
        controller: '',
        resolve:{

        },
        templateUrl: ''
    });

    states.push({ name: 'header.signin',
        url: '',
        controller: '',
        templateUrl: ''
    });

    states.push({   name: 'header.services',
        url: '',
        views: { '':
            { templateUrl: ''}
        },
        resolve: {
        }
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/");

});

cloudStbApp.run(function ($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});
});