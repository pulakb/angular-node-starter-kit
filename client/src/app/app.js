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
        templateUrl: 'templates/partials/header.tpl.html'
    });

    // tab
    states.push({   name: 'header.module1',
        url: '/home',
        templateUrl: 'templates/module-1/partials/module-1.tpl.html',
        resolve: {
        }
    });

    states.push({ name: 'header.module2',
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {
        }
    });

    states.push({ name: 'header.module3',
        url: '',
        controller: '',
        resolve:{

        },
        templateUrl: ''
    });

    states.push({ name: 'header.module4',
        url: '',
        controller: '',
        templateUrl: ''
    });

    states.push({   name: 'header.module5',
        url: '',
        views: { '':
            { templateUrl: ''}
        },
        resolve: {
        }
    });

    states.push({   name: 'header.module6',
        url: '',
        views: { '':
        { templateUrl: ''}
        },
        resolve: {
        }
    });

    states.push({   name: 'header.module7',
        url: '',
        views: { '':
        { templateUrl: ''}
        },
        resolve: {
        }
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/home");

});

angApp.run(function ($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});
});