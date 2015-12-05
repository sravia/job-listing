'use strict';

angular.module('jobs')
    .controller('CreateJobsController', function ($scope,ExpireDays, Jobs,Categories, $location, $routeParams, $http, WorkTimes, Upload,$timeout) {
        $scope.workTimes = WorkTimes.getWorkTimes();
        $scope.expireDays = ExpireDays.getExpireDays();

        Categories.query(function(categories) {
            $scope.categories = categories;
        });

        $scope.uploadFiles = function(file, errFiles) {
            $scope.errFile = errFiles && errFiles[0];
            if($scope.errFile){
                $scope.createJobError = ($scope.errFile.$error === "maxSize" ? "Bilde pārāk liela!": "Bilde netika augšupielādēta!");
            }else if (file){
                file.upload = Upload.upload({
                    url: '/jobs/upload',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response.data);
                        $scope.imageUrl = "/images/avatars/"+response.data.imgName;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.createJobError = response.status + ': ' + response.data;
                });
            }
        };

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };

        $scope.formatDate = function(date) {
            if(date != null){
                return new Date(date);
            }
        };

        $scope.findOne = function() {
            Jobs.get({
                jobId: $routeParams.jobId
            }, function(job) {
                $scope.job = job;
            });
        };

        $scope.create = function() {
            var job = new Jobs({
                profession: this.profession
            });
            job.$save(function(response) {
                $location.path("jobs/" + response._id);
            });

            this.title = "";
        };
    });
