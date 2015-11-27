'use strict';

angular.module('jobs')
  .controller('NavbarController', function ($scope, Auth, $location) {
        $scope.currentUrl = $location.path();
    $scope.menu = [{
      "title": "Sludinājumi",
      "link": "/jobs"
    }];

    $scope.adminMenu = [{
      "title": "Pievienot sludinājumu",
      "link": "/jobs/create"
    }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
