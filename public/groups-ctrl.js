angular.module("UniversityListApp").controller("GroupsCtrl", function($scope, $http) {
    function groups() {
        //$scope.groups = {};
        $http.get("https://aws1617-03.herokuapp.com/api/v1/groups", { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwUkJNemt5T1RWQlEwWTFNVFZDUlRjelJUZ3hRMFF4TkVSRVFqWkdOemcyTVVNMk0wWTFSUSJ9.eyJpc3MiOiJodHRwczovL2Rhbmk4YXJ0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzkxNjcwNjI2ODczMjAyNDAwOSIsImF1ZCI6IkVSQnR5eHNpNUpUQ09UWGU3dHFweHpIVWZaV0VLTktUIiwiZXhwIjoxNDk1NDEzMTU0LCJpYXQiOjE0OTUzNzcxNTQsIm5vbmNlIjoidHJHOUNqTElZRmh5d0c3aWtqNi5jd0kweklOMHRkNEkiLCJhdF9oYXNoIjoiSVVhUXdQcEhlbWhQWC04dWJDUFFnQSJ9.s1kGD4e6W8f5QyIZo6gx17WmUMHqi7lsCq8HNmXitlWOyLmRIgT0dGpTWkZivdRwhBCIza66i8HjTnekmelJG8u9D8XMwRddvRbLoBeuTdgQFb-EZ8F_3yGEpOmfk7Mo1-svVIOF5tI8ZGpVlUfhVzhtAgOf4yQsglcNl7LxmpnwKhGmZHrMwPgMQziGwgeZez11sv5mlQECXQqOK9UUIikxnV94cbIk0Q_Hliz8KIyKC9eMj_xCxTOz2Y-OXzkXEiDIr23-0uj10J4yuWU-3iBdJxyK16rnozQtVbEh_Q6GJiFrOoFi2MWE6hNICX6DQNotpbkI4Q74QYq4xscKdQ'}})
        .then(function(response) {
            $scope.groups = response.data;
        });
    }
    groups();
    $scope.getUniversity = function(){
        $http.get("/api/v1/universities/"+$scope.selectedOption.university).then(function(response) {
            $scope.university_name = response.data.name;
            $scope.getResearches();
        });
    }
    $scope.getResearches = function(){
        $http.get("https://aws1617-02.herokuapp.com/api/v1/researchers?group="+$scope.selectedOption._id, { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTUzNzY5NzksImV4cCI6MTQ5NjU4NjU3OX0.sn0insZkcQFi2KqUaEh39xNNh8kTTx_aHrKnA9hgX94'}})
        .then(function(response) {
            $scope.researches = response.data;
            console.log($scope.researches);
        });
        
    }
});