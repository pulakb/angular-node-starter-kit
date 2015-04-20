cloudStbApp.controller('channelController', ['$scope', 'channelData', function ($scope, channelData) {

    // Service IDs i.e. channel Ids
    var channelList = channelData.data;
    $scope.channelList = channelList;

}]);

cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', function ($scope, data, $stateParams) {

    // Access the source id from url
    if ($stateParams.cid) {
        // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
        data.getProgramList($stateParams.cid).then (function (response) {
            $scope.programList = response.data;

        });
    }

    // If ProgramId exists then, we can traverse programList to find Program Info for that particular id
    if ($stateParams.pid) {
        var _programList =  $scope.programList;

        var _programInfo = {};

        angular.forEach(_programList, function(singleProgram, key) {
            if (singleProgram.Programs['ProgramId'] === $stateParams.pid) {
                _programInfo.Title = singleProgram.Programs['Title'];
                _programInfo.Category = singleProgram.Programs['Category'];
                _programInfo.Duration = singleProgram.Programs['Duration'];
                _programInfo.Subcategory = singleProgram.Programs['Subcategory'];
                _programInfo.TVRating = singleProgram.Programs['TVRating'];
                _programInfo.AiringTime = singleProgram.Programs['AiringTime'];
                _programInfo.Dolby = singleProgram.Programs['Dolby'];
                _programInfo.Stereo = singleProgram.Programs['Stereo'];

                $scope.programInfo = _programInfo;
            }
        });
    }

}]);