angular.module("UniversityListApp").controller("ListCtrl", function($scope, $http){
    
    function refresh(){
        $http.get("/api/v1/universities").then(function (response){
            $scope.universities = response.data;
        });
    }
    
    $scope.addUniversity = function (){
        console.log("Adding university "+$scope.newUniversity);
        $http.post("/api/v1/universities",$scope.newUniversity).then(function (){
            refresh();
        });
        
    };
    $scope.delUniversity = function (acronym){
        $http.delete("/api/v1/universities/"+acronym).then(function (){
            refresh();
        });
        
    };
    $scope.delUniversities = function (acronym){
        $http.delete("/api/v1/universities").then(function (){
            refresh();
        });
        
    };
    
    refresh();
    
});