var app = angular.module('myApp', []);

app.controller('courseController', function($scope,$http) {
    $http.get("/assets/js/temp.json").then(function(response) {
        $scope.myData = response.data.records;
    });
});
