// File Name: app.js
var cloudStbApp = angular.module('cloudStbApp', ['ui.router', 'ct.ui.router.extras']);

cloudStbApp.config(function($stateProvider, $stickyStateProvider, $urlRouterProvider) {
    $stickyStateProvider.enableDebug(true);

    var states = [];
    states.push({   name: 'tabs',
        url: '/',
        views: {
        '@':   { templateUrl: 'templates/partials/tabs.tpl.html',
                 controller: function () {

                     settings_manager.getLastLcn(function(lcn) {
                         log.error('First Play');
                         getLcn(lcn);
                     });

                     //Setting focus to 'View By Channel' Tab on page display
                     $('#byChannel').focus();


                     // Play a video initially
                    // VideoPlayer.play("http://192.168.0.50:8080/vldms/tuner?ocap_locator=ocap://0x26");
                 }
                }
        }
    });

    // ViewByChannel tab
    states.push({   name: 'tabs.bychannel',
        url: 'channels',
        views: { 'channeltab':
                    { templateUrl: 'templates/partials/channel/channel.tpl.html'}
        },
        resolve: { foo: function() {
                        console.log("resolving 'foo' for tabs.viewbychannel");
                        return "foo"; }
        },
        deepStateRedirect: true,
        sticky: true
    });

    states.push({ name: 'tabs.bychannel.channellist',
        url: '/list',
        templateUrl: 'templates/partials/channel/channelCarousel.tpl.html',
        controller: 'channelController',
        resolve: {
            channelData: function (data) {
                return data.getChannelList();
            }
        }
    });

    states.push({ name: 'tabs.bychannel.channellist.channel',
        url: '/channel/:cid',
        controller: 'programController',
        resolve:{
            programList: ['$stateParams', 'data', function($stateParams, data){
                if ($stateParams.cid) {
                    // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
                    return data.getProgramList($stateParams.cid);
                }
            }]
        },
        templateUrl: 'templates/partials/channel/programCarousel.tpl.html'
    });


    states.push({ name: 'tabs.bychannel.channellist.channel.programInfo',
        url: '/programInfo/:pid',
        controller: 'programController',
        templateUrl: 'templates/partials/programInfo.tpl.html'
    });

    // ViewByTime tab
    states.push({   name: 'tabs.bytime',
        url: 'times',
        views: { 'timetab@tabs':
        { templateUrl: 'templates/partials/time/timeCarousel.tpl.html'}
        },
        resolve: { foo: function() {
            console.log("resolving 'foo' for tabs.viewbytime");
            return "foo"; }
        },
        deepStateRedirect: true,
        sticky: true
    });

    angular.forEach(states, function(state) { $stateProvider.state(state); });

    $urlRouterProvider.otherwise("/");



  /**
   * OLD CODE to be removed
   * $urlRouterProvider.otherwise("/guide");

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
    });*/
});

cloudStbApp.run(function ($rootScope, $state, $window, $timeout, EventManagerService, KeyHandlerService) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function() {});

    //Initialize the Keyboard Service
   /* EventManagerService.init();

    EventManagerService.on(function (key, evt) {
        KeyHandlerService.move(key, evt);
    });*/
});