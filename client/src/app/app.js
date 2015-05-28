'use strict';
/*
* @Description: Main Application file. Define all states here.
*
* */

var cloudStbApp = angular.module('cloudStbApp', ['ui.router', 'ct.ui.router.extras']);

cloudStbApp.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $stickyStateProvider.enableDebug(true);

    var states = [];
    states.push({   name: 'tabs',
        url: '/',
        views: {
        '@':   { templateUrl: '',
                 controller: function () {}
               }
        }
    });

    // tab
    states.push({   name: 'tabs.',
        url: '',
        views: { 'viewName':
                    { templateUrl: ''}
        },
        resolve: {
        },
        deepStateRedirect: true,
        sticky: true
    });

    states.push({ name: 'tabs.',
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {
        }
    });

    states.push({ name: 'tabs.',
        url: '',
        controller: '',
        resolve:{

        },
        templateUrl: ''
    });

    states.push({ name: 'tabs.',
        url: '',
        controller: '',
        templateUrl: ''
    });

    states.push({   name: 'tabs.',
        url: '',
        views: { '':
        { templateUrl: ''}
        },
        resolve: { foo: function() {
            console.log("resolving 'foo' for tabs.");
            return "foo"; }
        },
        deepStateRedirect: true,
        sticky: true
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/");

});

cloudStbApp.run(function ($rootScope, $state, $window, $timeout, EventManagerService, KeyHandlerService) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});
});