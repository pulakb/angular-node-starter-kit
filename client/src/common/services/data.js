'use strict';

/*
* @Description: Document all your HTTP Calls here.
* */
angApp.factory('data', [ '$http', '$q', function ($http, $q) {

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

  /*
  * @Description: send contact us data to server for saving in DB
  * */
  function saveContactUs (formData) {
      var deferred = $q.defer();

      $http.post('http://192.168.0.99:9090/general/contactus', formData).
          success(function(data, status, headers, config) {
              deferred.resolve(true);
          }).
          error(function(data, status, headers, config) {
              deferred.reject(false);
          });
      return deferred.promise;
  }

  /*
  * @Description: for module-4, getTopicsList()
  * */

  function getTopicsList() {
      // $http returns a promise for the url data
      return $http({method: 'GET', url: 'http://192.168.0.99:9090/topics/list'});
  }


  return {
    functionName1: functionName1,
    functionName2: functionName2,
    saveContactUs: saveContactUs,
    getTopicsList: getTopicsList
  }

}]);