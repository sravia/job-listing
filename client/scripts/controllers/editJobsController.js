'use strict';

angular.module('jobs')
    .controller('editJobsController', function ($scope,Jobs,ExpireDays, $location,Categories, Auth,$http,$stateParams, $timeout, WorkTimes,Upload) {
        $scope.errorMessage = "";
        $scope._workTimes = WorkTimes.getWorkTimes();
        $scope._expireDays = ExpireDays.getExpireDays();
        $scope.job = {};

        Jobs.get({
            jobId: $stateParams.jobId
        }, function(job) {
            $scope.job = job;
        });

        $scope.updateJob = function(){
            $scope.job.$update(function(response) {
                $location.path("jobs/" + response._id);
            });
        };

        Categories.query(function(categories) {
            $scope.categories = categories;
        });

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.getExpireDay = function(count) {
            return ExpireDays.getExpireDay(count);
        };

        $scope.uploadFiles = function(file, errFiles) {
            $scope.errFile = errFiles && errFiles[0];
            if($scope.errFile){
                $scope.errorMessage = ($scope.errFile.$error === "maxSize" ? "Bilde pārāk liela!": "Bilde netika augšupielādēta!");
            }else if (file){
                file.upload = Upload.upload({
                    url: '/api/global/upload',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                        $scope.job.image = "/uploads/"+response.data.name;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMessage = response.status + ': ' + response.data;
                });
            }
        };

    });