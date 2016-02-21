'use strict';

angular.module('jobs')
    .controller('ChangePasswordController', function ($scope,User, Auth, $location) {
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
                User.update({
                    password: $scope.passwords.password
                }, function(user) {
                    $scope.errorMessage = "Parole veiksmīgi nomainīta!";
                }, function(err) {
                    $scope.errorMessage = "Neizdevās nomainīt paroli!";
                });
            }
        }
    });