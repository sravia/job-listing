'use strict';

angular.module('jobs')
    .controller('JobController', function ($scope, Jobs,$stateParams, WorkTimes,moment,Upload,$timeout,Applications) {
        $scope.worktimes = WorkTimes.getWorkTimes();
        $scope.date = "";
        $scope.applyName = "";
        $scope.applyEmail = "";
        $scope.applyFileUrl = "";
        $scope.applyFileName = "";
        $scope.errorMessage = "";

        Jobs.get({
                jobId: $stateParams.jobId
        }, function(job) {
            $scope.job = job;
            $scope.date = moment(new Date(job.date)).fromNow();
        });

        $scope.uploadFiles = function(file, errFiles) {
            $scope.errFile = errFiles && errFiles[0];
            if($scope.errFile){
                $scope.errorMessage = ($scope.errFile.$error === "maxSize" ? "Fails pārāk liels!": "Fails netika ielādēts!");
            }else if (file){
                file.upload = Upload.upload({
                    url: 'api/global/upload',
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        $scope.applyFileUrl = "/uploads/"+response.data.name;
                        $scope.applyFileName = file.name;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMessage = response.status + ': ' + response.data;
                });
            }
        };

        $scope.apply = function() {
            if($scope.applyName == "" || $scope.applyEmail == "" || $scope.applyFileUrl == ""){
               $scope.errorMessage = "Lūdzu norādiet visus datus!";
            }else{
                var application = new Applications({
                    jobId: $scope.job._id,
                    date: new Date(),
                    name: $scope.applyName,
                    email: $scope.applyEmail,
                    cv: $scope.applyFileUrl
                });
                application.$save(function(response) {
                    console.log(response);
                    jQuery(".successApplication").modal('show');
                    jQuery('.applicationModal').modal('hide');
                });
            }
        };

        $scope.getWorkTime = function(_id) {
            return WorkTimes.getWorkTime(_id);
        };
    });