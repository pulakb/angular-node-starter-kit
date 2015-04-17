cloudStbApp.directive('rowHeader', function () {
	return {
		restrict: 'EA',  //E = element, A = attribute, C = class, M = comment    
		scope: {}, // isolate scope
		replace: true,
		templateUrl: 'templates/directives/rowHeader.tpl.html',
		controller: [ '$scope', 'dateTime', function ($scope, dateTime) {
			//Embed a custom controller in the directive
			var headings = [];

			var MAX_COL = 3,
				addMinutes = 0,
				startTime = dateTime.getGridStartTime(),
				minutes = startTime.getMinutes();

			startTime.setSeconds(0,0);

			if(minutes < 30) {
				startTime.setMinutes(0);
			} else {
				startTime.setMinutes(30);
			}

			var newDate = new Date(startTime);

			for ( var col = 1; col <= MAX_COL; col++) {
				newDate.setMinutes ( newDate.getMinutes() + addMinutes);
		 		addMinutes = 30;

				var colProperties = {
					"id": "row0" + col,
					"className": "layout_frame",
					"width": "242px",
					"text": newDate.toTimeString().substring(0,5)
				}

				headings.push(colProperties);
			}

			$scope.headings = headings;

		} ],
		link: function (scope, element, attrs) {
			//DOM manipulation
			scope.headingData = scope.headings;
		}
	};
});