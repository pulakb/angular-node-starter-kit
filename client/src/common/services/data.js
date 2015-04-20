cloudStbApp.factory('data', [ '$http', '$q', function ($http, $q) {

  // Following function gives all channels
  function getChannelList () {
    // $http returns a promise for the url data
    return $http({method: 'GET', url: 'http://127.0.0.1:8080/epg/channels?user=rovi'});
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
      * Hard coding for now but userStartTime and userEndTime will be variable
      * */

      var userStartTime = '2015-04-14T00:00:00Z',
          userEndTime = '2015-04-14T10:30:00Z';

      var _url = 'http://localhost:8080/epg/programs?user=rovi&sourceId=' + sourceID + '&userStartTime=' + userStartTime + '&userEndTime=' + userEndTime;

      return $http({method: 'GET', url: _url});
  }

  return {
    getChannelList: getChannelList,
    getProgramList: getProgramList,
    getProgramInfo: getProgramInfo
  }

}]);