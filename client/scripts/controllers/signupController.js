'use strict';

angular.module('jobs')
  .controller('SignupController', function ($scope, Auth, $location) {
    $scope.register = function(form) {
      Auth.createUser({
          email: $scope.user.email,
          password: $scope.user.password,
          recoverycode : $scope.user.recoverycode
        },
        function(err) {
          $scope.errors = {};

          if (!err) {
            $location.path('/');
          }
        }
      );
    };
  });