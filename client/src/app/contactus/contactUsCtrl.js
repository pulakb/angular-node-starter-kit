/*
* @Description: Contact US controller will use data service to store data
* in DB
*
* Nice Example: http://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
* https://docs.angularjs.org/api/ng/service/$http
* */
angApp.controller('contactUsCtrl', ['$scope', 'data', function ($scope, data) {
    //Set Success and Error Msg hidden initially
    $scope.error = false;
    $scope.success = false;

    $scope.send = function () {

        var body = {
            fName: $scope.user.fname,
            lName: $scope.user.lname,
            email: $scope.user.email,
            message: $scope.user.message
        };

        data.saveContactUs(body).then(function (response) {
            //Show success message
            $scope.success = true;

            //Set user object empty
            $scope.user = {};

        }, function (failure) {
            //Show success message
            $scope.error = true;
        });
    }

}]);