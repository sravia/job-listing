'use strict';

angular.module('jobs')
    .controller('JobsController', function ($scope, Jobs,Categories, $location, $routeParams, $http, WorkTimes, Upload,$timeout) {
        $scope.selectedProfessions = [];
        $scope.selectedWorktimes = [];
        $scope.keywords = "";
        $scope.location = "";
        $scope.currentPage = 1;
        $scope.itemsPerPage = 2;
        $scope.totalItems = 1;

        //addDays(new Date(),
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        Categories.query(function(categories) {
            $scope.categories = categories;
        });

        $scope.$watch('selectedProfessions', function (val){
            $scope.getFilteredJobs();
        });

        $scope.$watch('selectedWorktimes', function (val){
            $scope.getFilteredJobs();
        });

        $scope.$watch('keywords', function (val){
            $scope.getFilteredJobs();
        });

        $scope.$watch('location', function (val){
            $scope.getFilteredJobs();
        });

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.remove = function(job) {
            job.$remove();

            for (var i in $scope.jobs) {
                if ($scope.jobs[i] == job) {
                    $scope.jobs.splice(i, 1);
                }
            }
        };

        $scope.formatDate = function(date) {
            if(date != null){
                return new Date(date);
            }
        };

        $scope.loadJobs = function() {
            Jobs.query(function(jobs) {
                $scope.jobs = jobs;
                $scope.totalItems = jobs.length;
            });
        };

        $scope.findOne = function() {
            Jobs.get({
                jobId: $routeParams.jobId
            }, function(job) {
                $scope.job = job;
            });
        };

        // TODO - Refactor this disaster - expressjs multiple optional parameters not allowed?
        $scope.getFilteredJobs = function() {
            var start = ($scope.currentPage-1) * $scope.itemsPerPage;
            var end = $scope.itemsPerPage;
            var keywords = $scope.keywords == "" ? "null" : $scope.keywords;
            var location = $scope.location == "" ? "null" : $scope.location;
            var tempProfessions = [];
            for(var i = 0 ; i < $scope.selectedProfessions.length; i++){
                tempProfessions.push($scope.selectedProfessions[i]._id);
            }
            var professions = tempProfessions == "" ? "null" : tempProfessions;
            var tempWorktimes = [];
            for(var i = 0 ; i < $scope.selectedWorktimes.length; i++){
                tempWorktimes.push($scope.selectedWorktimes[i].id);
            }
            var worktimes = tempWorktimes == "" ? "null" : tempWorktimes;
            $http.get("/api/jobs/" + start + "/"+end+"/"+keywords+"/"+location+"/"+professions+"/"+worktimes)
                .then(function(response) {
                    $scope.filteredJobs = response.data;
                    $scope.getFilteredJobsCount();
                });
        };

        // TODO - Refactor this disaster - expressjs multiple optional parameters not allowed?
        $scope.getFilteredJobsCount = function() {
            var keywords = $scope.keywords == "" ? "null" : $scope.keywords;
            var location = $scope.location == "" ? "null" : $scope.location;
            var tempProfessions = [];
            for(var i = 0 ; i < $scope.selectedProfessions.length; i++){
                tempProfessions.push($scope.selectedProfessions[i]._id);
            }
            var professions = tempProfessions == "" ? "null" : tempProfessions;

            var tempWorktimes = [];
            for(var i = 0 ; i < $scope.selectedWorktimes.length; i++){
                tempWorktimes.push($scope.selectedWorktimes[i].id);
            }
            var worktimes = tempWorktimes == "" ? "null" : tempWorktimes;

            $http.get("/api/jobs/count/"+keywords+"/"+location+"/"+professions+"/"+worktimes)
                .then(function(response) {
                    $scope.totalItems = response.data;
                });
        };
    });
