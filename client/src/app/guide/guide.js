cloudStbApp.controller('guideController', ['$scope', 'dateTime', 'data', 'channelData', function ($scope, dateTime, data, channelData) {

  var channelList = channelData.data[0]['guideResponseDTO'];
    $scope.channelList = channelList.channelsArray;

    var urlList = [],
    	channelProgramList = [],
    	oneScreenchannelProgramList = [],
    	times = dateTime.startEndTimeInMilli();

    var _self = this;

    // Keep a reference of the GuideManager @@@
    //this.guideManager = GuideManager;


    //IPAddress should come from config file
    for ( var i = 0; i < channelList.channelsArray.length; i++) {
    	var _url = 'http://10.78.150.61:3000/March13/epgService/programLists?channelId=' + channelList.channelsArray[i]['channelId'];
    		_url += '&userStartTime=' + times.startTime;
    		_url += '&userEndTime=' + times.endTime;

    	urlList.push(_url);
    }

    // Pass urlList to fetch program info for all channels based on start & end time 
	data.getProgramInfo(urlList).then (function (response) {
		completeOneDayProgramInfo(response);
		completeOneScreenProgramInfo();

		prepareProgramVideoScreenData();


		// Need to call the init() function to start listening on the keyboard @@@
		/*KeyboardService.init();
		KeyboardService.on(function(key) {
	      self.guideManager.move(key);
	    });*/
	});

	/** Following function holds complete info from current time to
	* END of the day
	*/
	var completeOneDayProgramInfo = function (response) {
		for ( var i = 0; i < channelList.channelsArray.length; i++) {
			var channelProgram = {
				channelId: channelList.channelsArray[i]['channelId'],
				channelName: channelList.channelsArray[i]['channelName'],
				channelNumber: channelList.channelsArray[i]['channelNumber'],
				allPrograms: response[i].data
			};

			channelProgramList.push(channelProgram);
		}	
	};

	/** Following function holds complete info for 90 mins
	* program info for all channels
	*
	* ALL will be in MINUTES
	*
	*/

	var completeOneScreenProgramInfo = function () {
		var _totalGridDuration = 90,
			_durationLeft = 90,
			_gridStartTime = (dateTime.getGridStartTime()),
			_gridEndTime = (dateTime.getGridEndTime());

		/**
		* Iterate over all programs of every channel and extract programs 
		* of total duration 90 mins
		*/

		// Go over every channel
		angular.forEach(channelProgramList, function(singleShannel, key) {

			// Get programs of that particular channel
			var programs = singleShannel.allPrograms,
				_oneScreenGridData = [];

			// Variable to add program duration to check the value 90 later
			var duration = 0,
				programDisplayDuration = 0,
				totalAvailableDuration = 0; // total duration of programs available in 90 mins frame

			_oneScreenGridData[singleShannel.channelId] = new Array();

			// Loop over every programs for that particular channel
			for ( var i = 0; i < programs.length; i++ ) {

				var programStartTime = new Date(programs [i].userStartTime);
				var programEndTime = new Date(programs [i].userEndTime);
				var programDuration = programs [i].duration;
				var flag = false;

				if ( programStartTime >= _gridStartTime && programStartTime < _gridEndTime ) {					
					// Check Program start time falls between grid start & grid end time

					var timeDuration = (_gridEndTime - programStartTime)/60000;
					var durationAfterGridEndTime = (programEndTime - _gridEndTime)/60000;
			
					var displayDuration = 0;

					if( programDuration <= timeDuration) {
						displayDuration = programDuration;
					} else {
					 displayDuration = timeDuration;	
					}

					programDisplayDuration = displayDuration;

					flag = true;

				} else if ( _gridStartTime >= programStartTime && _gridStartTime < programEndTime 
					&& programEndTime <= _gridEndTime) {
					// Check one hr event which started before _gridStartTime but ends before _gridEndTime

					var timeDuration = (programEndTime - _gridStartTime)/60000;
					var durationAfterGridEndTime = (_gridStartTime - programStartTime)/60000;

					programDisplayDuration = timeDuration;

					flag = true;

				} else if ( _gridStartTime >= programStartTime && _gridEndTime < programEndTime ) {
					// Check a program starts after _gridStartTime and ends after _gridEndTime
					
					var timeDuration = 90;

					var durationAfterGridEndTime = (programEndTime - _gridEndTime) / 60000;
					var durationBeforeGridStartTime = (_gridStartTime - programStartTime) / 60000;

					programDisplayDuration = timeDuration;

					flag = true;
				}

				if ( flag ) {
					// Add program durations
					duration += programDisplayDuration;

					if ( duration <= 90 ) {
						_oneScreenGridData[singleShannel.channelId].push(programs [i]);

						// total duration of programs available in 90 mins frame
						totalAvailableDuration += programDisplayDuration;

					} else {
						break;
					}
				}

			} // for loop ends

			// if totalAvailableDuration is less than 90, i.e, missingDuration > 0, add 'No Info' object
			if ( totalAvailableDuration != 90 && ( ( 90 - totalAvailableDuration) > 0 )) {

				var noInfo = {
					"description": "No Information",
					"duration": 0,
					"programId": 0,
					"programName": "No Information",
					"serviceId": 0,
					"userEndTime": 0,
					"userStartTime": 0
				}

				_oneScreenGridData[singleShannel.channelId].push(noInfo);
			}

			/**
			* 'channelProgramList' is a single object which holds every information, like all program info
			* which contains all program data from current time to EOD, 'gridProgramData' which holds data
			* for single grid screen of 90 mins.
			*
			* SO this object can be used to fetch all info required in a screen.
			*/
			channelProgramList[key].gridProgramData = _oneScreenGridData[singleShannel.channelId];

			// Store the total no. of programs for a channel/service - used in template for cell width calculation
			channelProgramList[key].gridProgramDataLength = _oneScreenGridData[singleShannel.channelId].length;

		}); //forEach Ends	

		// Assign it to scope
		$scope.channelProgramList = channelProgramList;
		
	}; // completeOneScreenProgramInfo function ends


	/**
	* Following function processes 'channelProgramList' variable to prepare
	* data for program info and video url.
	*
	*/
	var prepareProgramVideoScreenData = function () {

		var _index = 0;

		var singleChannelProgram = channelProgramList[_index];
		
		$scope.programInfoData = {
			"title": singleChannelProgram.gridProgramData[0]["programName"],
			"synopsis": singleChannelProgram.gridProgramData[0]["description"], 
			"time": dateTime.getCustomStartEndTime (singleChannelProgram.gridProgramData[0]["duration"], singleChannelProgram.gridProgramData[0]["userStartTime"]),
			"date": dateTime.getCustomDate(singleChannelProgram.gridProgramData[0]["userStartTime"]),
			"channelName": singleChannelProgram.channelName
		};	
	};

}]);