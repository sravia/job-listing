'use strict';

angular.module('jobs')
    .controller('ApplicationsController', function ($scope, Jobs,$stateParams,$http, WorkTimes,moment,Upload,$timeout,Applications) {


        $scope.getDate = function(date) {
            return moment(new Date(date)).fromNow();
        };

        $scope.delete = function(j) {
            var application = new Applications(j);
            application.$remove(function() {
                $scope.loadApplications();
            });
        };

        $scope.loadApplications = function() {
            $http.get("/api/application/job/"+$stateParams.jobId)
                .then(function(response) {
                    $scope.applications = response.data;
                });
        };
    });