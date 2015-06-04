'use strict';
/*
* @Description: Main Application file. Define all states here.
*
* Try to follow style guide from https://github.com/johnpapa/angular-styleguide
* */

var angApp = angular.module('angApp', ['ui.router']);

angApp.config(function($stateProvider, $urlRouterProvider) {

    var states = [];

    states.push({   name: 'home',
        url: '/',
        templateUrl: 'templates/partials/home.tpl.html',
        resolve: {},
        controller: 'homeController'
    });

    // tab
    states.push({   name: 'module2',
        url: '/module2  ',
        templateUrl: 'templates/module-2/partials/module-2.tpl.html',
        resolve: {},
        controller: 'module2Controller'

    });

    states.push({ name: 'module3',
        url: '/module3',
        templateUrl: 'templates/module-3/partials/module-3.tpl.html',
        resolve:{},
        controller: 'module3Controller'
    });

    states.push({ name: 'module4',
        url: '/module4',
        templateUrl: 'templates/module-4/partials/module-4.tpl.html',
        resolve:{},
        controller: 'module4Controller'
    });

    states.push({   name: 'module5',
        url: '/module5',
        templateUrl: 'templates/module-5/partials/module-5.tpl.html',
        resolve:{},
        controller: 'module5Controller'
    });

    states.push({   name: 'module6',
        url: '/module6',
        templateUrl: 'templates/module-6/partials/module-6.tpl.html',
        resolve:{},
        controller: 'module6Controller'
    });

    states.push({   name: 'module7',
        url: '/module7',
        templateUrl: 'templates/module-7/partials/module-7-form-1.tpl.html',
        resolve:{},
        controller: 'module7Controller'
    });

    states.push({   name: 'contactus',
        url: '/contactus',
        templateUrl: 'templates/contactus/partials/contactus-form.tpl.html',
        resolve:{},
        controller: 'contactUsCtrl'
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/");

});

angApp.run(function ($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});
});