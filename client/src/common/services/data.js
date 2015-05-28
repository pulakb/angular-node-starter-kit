'use strict';

/*
* @Description: Document all your HTTP Calls here.
* */
cloudStbApp.factory('data', [ '$http', '$q', function ($http, $q) {

  //Makes a single HTTP Request
  function functionName1 () {
    // $http returns a promise for the url data
    return $http({method: 'GET', url: ''});
  }

  //Makes multiple HTTP Requests
  function functionName2 (parameters) {
    var deferred = $q.defer();

    // Fire all http calls
    $q.all(parameters.map(function (_url) {
      return $http({method: 'GET', url: _url});
    })).then(function (results) {   
      deferred.resolve(results);
    });

    return deferred.promise;
  }

  return {
    functionName1: functionName1,
    functionName2: functionName2
  }

}]);