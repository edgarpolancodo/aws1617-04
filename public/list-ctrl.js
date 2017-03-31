angular.module("UniversityListApp").controller("ListCtrl", function($scope, $http){
    function refresh(){
        $http.get("/api/v1/universities").then(function (response){
            $scope.universities = response.data;
        });
    }
    refresh();
});