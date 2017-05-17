angular.module("UniversityListApp").controller("ListCtrl", function($scope, $http) {


    function refresh() {
        $http.get("/api/v1/universities").then(function(response) {
            $scope.universities = response.data;
        });
    }

    $scope.addUniversity = function() {
        console.log("Adding university " + $scope.newUniversity);
        $http.post("/api/v1/universities", $scope.newUniversity).then(function() {
            refresh();
            //$scope.newUniversity = [];
            $scope.newUniversity.acronym = "";
            $scope.newUniversity.name = "";
            $scope.newUniversity.url = "";
            $scope.newUniversity.country = "";
        });
    };

    $scope.delUniversity = function(acronym) {
        $http.delete("/api/v1/universities/" + acronym).then(function() {
            refresh();
        });
    };

    $scope.delUniversities = function() {
        $http.delete("/api/v1/universities").then(function() {
            refresh();
        });
    };

    $scope.editUniversity1 = function(acronym) {
        $http.get("/api/v1/universities/" + acronym).then(function(response) {
            $scope.newUniversity = response.data;
            $('#boton_add').attr("style", "display:none");
            $('#boton_edit').attr("style", "display:block");
        });
    };

    $scope.editUniversity2 = function(acronym) {
        $http.put("/api/v1/universities/" + acronym, $scope.newUniversity).then(function() {
            refresh();
            $('#boton_add').attr("style", "display:block");
            $('#boton_edit').attr("style", "display:none");
            $scope.newUniversity = [];
        });
    };

    $scope.searchUniversity = function(acronym) {
        $scope.university = {};
        $http.get("/api/v1/universities/" + acronym).then(function(response) {
            $scope.university = response.data;
        });
    };

    refresh();
});
