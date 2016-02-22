'use strict';

angular.module('jobs')
    .controller('allJobsController', function ($scope,Jobs,$location, Auth,$http,$stateParams, WorkTimes,$rootScope) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;
        $scope.totalItems = 1;

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.delete = function(j) {
            var job = new Jobs(j);
            job.$remove(function() {
                $scope.getFilteredJobs();
            });
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