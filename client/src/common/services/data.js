cloudStbApp.factory('data', [ '$http', '$q', function ($http, $q) {

  // Following function gives all channels
  function getChannelList () {
    // $http returns a promise for the url data
    return $http({method: 'GET', url: 'http://192.168.0.18:8080/epg/channels?user=rovi'});
  }

  // Following function gives program info for every channel
  function getProgramInfo (urlList) {
    var deferred = $q.defer();

    // Fire all http calls
    $q.all(urlList.map(function (_url) {
      return $http({method: 'GET', url: _url});
    })).then(function (results) {   
      deferred.resolve(results);
    });

    return deferred.promise;
  }

  // Fetches Program Data for a particular channel based on start and end time
  function getProgramList(sourceID) {
      /*
      * Hard coding for now but userStartTime and userEndTime will be variable in local time zone
      *
      * var dt = new Date();
      * var utcUserStartTime = dt.toISOString();
      *
      * var endTime = new Date();
      * endTime.setHours(23, 59, 59, 999);
      * var utcUserEndTime = endTime.toISOString();
      *
      * console.log(utcUserEndTime.toISOString());
      * */

      //var startEndTime = datetime.UTCLocalTimeConversion();

      // Replace hard coded value with the properties in 'startEndTime' object
      var userStartTime = '2015-04-27T05:00:00Z',
          userEndTime = '2015-04-27T21:30:00Z';

      var _url = 'http://192.168.0.18:8080/epg/programs?user=rovi&sourceId=' + sourceID + '&userStartTime=' + userStartTime + '&userEndTime=' + userEndTime;

      return $http({method: 'GET', url: _url});
  }

  return {
    getChannelList: getChannelList,
    getProgramList: getProgramList,
    getProgramInfo: getProgramInfo
  }

}]);