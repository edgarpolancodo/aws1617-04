angular.module("UniversityListApp").controller("ElsevierCtrl", function($scope, $http) {

    function universities() {
        //$scope.groups = {};
        $http.get("/api/v1/universities/").then(function(response) {
            $scope.universities = response.data;
        });
    }
    universities();
    $scope.getScopus = function(){
        $http.get("https://api.elsevier.com/content/search/scopus?start=0&count=10&apiKey=4906ecf13b2461d219e91bd78d3f4b95&query=affil%28"+$scope.selectedOption.name+"%29", { headers: {'Accept': 'application/json'}})
        .then(function(response) {
            console.log(response.data);
            $scope.documents = response.data["search-results"].entry;
            //console.log($scope.researches);
        });
        
    }
});