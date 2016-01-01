'use strict';

angular.module('jobs')
    .controller('RetrievePasswordController', function ($scope, Auth, $location) {
        $scope.errorMessage = "";
        $scope.passwords = {
            password : "",
            secondPassword : ""
        };

        $scope.$watchCollection('passwords', function(newVal, oldVal) {
            if($scope.passwords.password != $scope.passwords.secondPassword && $scope.passwords.secondPassword != "") {
                $scope.errorMessage = "Paroles nav vienādas!";
            }else{
                $scope.errorMessage = "";
            }
        });

        $scope.retrievepassword = function(){
            if($scope.errorMessage == "" && $scope.passwords.secondPassword != ""){
                console.log("get pw");
            }
        }
    });