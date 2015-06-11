'use strict';
angApp.controller('module4Controller', ['$scope', 'data', function ($scope, data) {

    //Topics data
    var _tData;

    _tData = data.getTopicsList().then(function (response) {
       _tData = response.data;
    }, function (reason) {

    });

}]);
