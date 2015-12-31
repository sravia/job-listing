'use strict';

angular.module('jobs')
    .controller('editJobsController', function ($scope,Jobs,ExpireDays, $location,Categories, Auth,$http,$routeParams, WorkTimes,$rootScope) {
        $scope.errorMessage = "";
        $scope._workTimes = WorkTimes.getWorkTimes();
        $scope._expireDays = ExpireDays.getExpireDays();
        $scope.job = [];

        Jobs.get({
            jobId: $routeParams.jobId
        }, function(job) {
            console.log(job);
            $scope.job._id = job._id;
            $scope.job.categoryId = job.categoryId;
            $scope.job.company = job.company;
            $scope.job.date = job.date;
            $scope.job.description = job.description;
            $scope.job.expireDaysId = job.expireDaysId;
            $scope.job.image = job.image;
            $scope.job.location = job.location;
            $scope.job.profession = job.profession;
            $scope.job.user = job.user;
            $scope.job.workTimeId = job.workTimeId;
        });

        Categories.query(function(categories) {
            $scope.categories = categories;
        });

        $scope.$watchCollection('job', function (newVal, oldVal) {
           // console.log($scope.job);
        });


        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.getExpireDay = function(count) {
            return ExpireDays.getExpireDay(count);
        };

        $scope.update = function(){
            var job = new Jobs($scope.job);
            console.log(job);

            job.$update(function(response) {
               // $location.path("jobs/" + response._id);
            });
        };

        $scope.uploadFiles = function(file, errFiles) {
            $scope.errFile = errFiles && errFiles[0];
            if($scope.errFile){
                $scope.errorMessage = ($scope.errFile.$error === "maxSize" ? "Bilde pārāk liela!": "Bilde netika augšupielādēta!");
            }else if (file){
                file.upload = Upload.upload({
                    url: '/jobs/upload',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                        $scope.job.image = "/images/avatars/"+response.data.imgName;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMessage = response.status + ': ' + response.data;
                });
            }
        };

    });