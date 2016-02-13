'use strict';

angular.module('jobs')
    .controller('JobController', function ($scope, Jobs,$stateParams, WorkTimes,moment,Upload,$timeout) {
        $scope.worktimes = WorkTimes.getWorkTimes();
        $scope.date = "";
        $scope.applyName = "";
        $scope.applyEmail = "";
        $scope.applyFileUrl = "";
        $scope.applyFileName = "";

        Jobs.get({
                jobId: $stateParams.jobId
        }, function(job) {
            $scope.job = job;
            $scope.date = moment(new Date(job.date)).fromNow();
        });

        $scope.uploadFiles = function(file, errFiles) {
            $scope.errFile = errFiles && errFiles[0];
            if($scope.errFile){
                $scope.createJobError = ($scope.errFile.$error === "maxSize" ? "Fails pārāk liels!": "Fails netika ielādēts!");
            }else if (file){
                file.upload = Upload.upload({
                    url: 'api/global/upload',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                        $scope.applyFileUrl = "/uploads/"+response.data.name;
                        $scope.applyFileName = response.data.name;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.createJobError = response.status + ': ' + response.data;
                });
            }
        };

        $scope.apply = function(_id) {
            console.log(_id);
            console.log($scope.applyName);
            console.log($scope.applyEmail);
            console.log($scope.applyFileUrl);
        };

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };
    });