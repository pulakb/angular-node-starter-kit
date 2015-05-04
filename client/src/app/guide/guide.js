cloudStbApp.controller('channelController', ['$scope', 'channelData', 'VideoPlayer', function ($scope, channelData, VideoPlayer) {

    // Service IDs i.e. channel Ids
    var channelList = channelData.data;
    $scope.channelList = channelList;

    console.log($scope.channelList);

    //VideoPlayer.play("http://192.168.0.50:8080/vldms/tuner?ocap_locator=ocap://0x26");

}]);

cloudStbApp.controller('programController', ['$scope', 'data', '$stateParams', 'programList', 'VideoPlayer', function ($scope, data, $stateParams, programList, VideoPlayer) {

    // Access the source id from url
    if ($stateParams.cid) {
        // Pass SourceID/ChannelId to fetch program info for that channel based on start & end time
        $scope.programList = programList.data;
    }

    // If ProgramId exists then, we can traverse programList to find Program Info for that particular id
    if ($stateParams.pid) {
        var _programList =  $scope.programList;

        /*
        * Following Code block will be removed later. Here we are hard coding program ID patterns with
        * Video URLs.
        * */

        VideoPlayer.play("http://192.168.0.50:8080/vldms/tuner?ocap_locator=ocap://0x27");

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