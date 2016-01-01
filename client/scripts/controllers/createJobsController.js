'use strict';

angular.module('jobs')
    .controller('CreateJobsController', function (Auth,$scope,ExpireDays, Jobs,Categories, $location, $http, WorkTimes, Upload,$timeout) {
        $scope.workTimes = WorkTimes.getWorkTimes();
        $scope.expireDays = ExpireDays.getExpireDays();
        $scope.expireDay = $scope.expireDays[0].id;
        $scope.workTime = $scope.workTimes[0].id;

        Categories.query(function(categories) {
            $scope.categories = categories;
            $scope.category = $scope.categories[0]._id;
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

        $scope.create = function() {
            var job = new Jobs({
                user: Auth.getUser()._id,
                categoryId: this.category,
                company: this.company,
                profession: this.profession,
                worktime: this.workTime,
                location: this.location,
                description: this.description,
                image: this.imageUrl,
                date: new Date(),
                expireDays: $scope.expireDays[this.expireDay].id
            });
            job.$save(function(response) {
                $location.path("jobs/" + response._id);
            });

            this.title = "";
        };
    });
