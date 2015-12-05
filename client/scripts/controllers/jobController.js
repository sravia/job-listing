'use strict';

angular.module('jobs')
    .controller('JobController', function ($scope, Jobs,$routeParams, WorkTimes,moment) {
        $scope.worktimes = WorkTimes.getWorkTimes();
        $scope.date = "";

        Jobs.get({
                jobId: $routeParams.jobId
        }, function(job) {
            $scope.job = job;
            $scope.date = moment(new Date(job.date)).fromNow();
        });

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };
    });