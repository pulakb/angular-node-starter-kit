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

  return {
    getChannelList: getChannelList,
    getProgramInfo: getProgramInfo
  }

}]);