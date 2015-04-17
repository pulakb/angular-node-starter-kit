cloudStbApp.controller('channelController', ['$scope', 'channelData', function ($scope, channelData) {

    // Service IDs i.e. channel Ids
    var channelList = channelData.data;
    $scope.channelList = channelList;

}]);