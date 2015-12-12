'use strict';

angular.module('jobs')
    .controller('allJobsController', function ($scope, Auth,$http,$routeParams, WorkTimes,$rootScope) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 2;
        $scope.totalItems = 1;

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.formatDate = function(date) {
            if(date != null){
                return new Date(date);
            }
        };

        $scope.getFilteredJobs = function() {
            var start = ($scope.currentPage-1) * $scope.itemsPerPage;
            var end = $scope.itemsPerPage;
            $http.get("/api/jobs/" + start + "/"+end+"/"+Auth.getUser()._id)
                .then(function(response) {
                    $scope.filteredJobs = response.data;
                    $scope.getFilteredJobsCount();
                });
        };

        $scope.getFilteredJobsCount = function() {
            $http.get("/api/jobs/count/"+Auth.getUser()._id)
                .then(function(response) {
                    $scope.totalItems = response.data;
                });
        };

    });