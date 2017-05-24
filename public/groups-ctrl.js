angular.module("UniversityListApp").controller("GroupsCtrl", function($scope, $http) {
    function groups() {
        //$scope.groups = {};
        $http.get("https://aws1617-03.herokuapp.com/api/v1/groups", { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwUkJNemt5T1RWQlEwWTFNVFZDUlRjelJUZ3hRMFF4TkVSRVFqWkdOemcyTVVNMk0wWTFSUSJ9.eyJpc3MiOiJodHRwczovL2Rhbmk4YXJ0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzkxNjcwNjI2ODczMjAyNDAwOSIsImF1ZCI6IkVSQnR5eHNpNUpUQ09UWGU3dHFweHpIVWZaV0VLTktUIiwiZXhwIjoxNDk1ODA0MDQ1LCJpYXQiOjE0OTU0NTg0NDUsIm5vbmNlIjoibzVBcVBBd2NIcDF3ZnhyM0tQYnltcllKU1BMcHBrazIiLCJhdF9oYXNoIjoiWC11eFZTT083cGhHb1d3RFhvUVQ5dyJ9.CUdIrsSJUtn67JdhPeeAs97Ywi-ocCIKCYaRbKCEEEyg3MLASVcqOPoS6bYrQFrWoWcjvI1YP_CvJnnZqs34ibjlFpnUHMSTrqpu4H9NbXoBw5X9pe4yuu5_ncBMy7WzPFRvvUKbNS5aZx7XqkyhZdk12l1fMOR71c3-5ZTj2DYn8bTJRN4UaJAVZqyWoS8ViNRzfmYo1gcXzekIvKWcDCrtJVrziV4xd3jbBH9oakvJ_NYs2sK1t5gPZxL83WP8QvaCvbNZMhIiuroe7bZaoe4woYilGrw0iwgqcbSHNmLrMJ0zBI9lg9h6vnRQpIJuAKi5iy27q7NQhqKu4kHwJQ'}})
        .then(function(response) {
            $scope.groups = response.data;
        });
    }
    groups();
    $scope.getUniversity = function(){
        if(typeof $scope.selectedOption.university != 'undefined'){
        $http.get("/api/v1/universities/"+$scope.selectedOption.university).then(function(response) {
            $scope.university_name = response.data.name;
            $scope.getResearches();
        });
            
        }else{
            $scope.university_name = "";
            $scope.researches = {};
        }
        
    }
    $scope.getResearches = function(){
        $http.get("https://aws1617-02.herokuapp.com/api/v1/researchers?group="+$scope.selectedOption._id, { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTI3NjYyMjQsImV4cCI6MTQ5Mzk3NTgyNH0.WExNusVFHUcM6LKCwp3cz2SudqM1-CWF3DCZZIPNF-E'}})
        .then(function(response) {
            $scope.researches = response.data;
            //console.log($scope.researches);
        });
        
    }
});