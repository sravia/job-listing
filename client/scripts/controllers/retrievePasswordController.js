'use strict';

angular.module('jobs')
    .controller('RetrievePasswordController', function ($scope,User,$http, Auth, $location) {
        $scope.errorMessage = "";
        $scope.recoverycode = "";
        $scope.email = "";
        $scope.password = "";
        $scope.userId = "";

        $scope.retrievepassword = function(){
            if($scope.email == "" || $scope.recoverycode == ""){
                $scope.errorMessage = "Visiem laukiem jābūt aizpildītiem!";
            }else{
                $http.get("/auth/recoverpassword/"+$scope.email+"/"+$scope.recoverycode)
                    .then(function(response) {
                        if(response.data.exists == true){
                            $scope.userId = response.data.userId;
                            jQuery(".changePasswordModal").modal('show');
                        }else{
                            $scope.errorMessage = "Tika ievadīti nepareizi dati!";
                        }
                    });
            }
        };

        $scope.changepassword = function(){
            console.log("/auth/changepassword/"+$scope.userId+"/"+$scope.password);
            $http.get("/auth/changepassword/"+$scope.userId+"/"+$scope.password)
                .then(function(response) {
                    jQuery(".successChange").modal('show');
                    jQuery(".changePasswordModal").modal('hide');
                });
        };
    });