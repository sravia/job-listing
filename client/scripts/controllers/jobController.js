'use strict';

angular.module('jobs')
    .controller('JobController', function ($scope, Jobs,$stateParams, WorkTimes,moment) {
        $scope.worktimes = WorkTimes.getWorkTimes();
        $scope.date = "";

        Jobs.get({
                jobId: $stateParams.jobId
        }, function(job) {
            $scope.job = job;
            $scope.date = moment(new Date(job.date)).fromNow();
        });

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };
    });