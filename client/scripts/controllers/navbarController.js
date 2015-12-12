'use strict';

angular.module('jobs')
  .controller('NavbarController', function ($scope,$rootScope, Auth, $location) {
        $scope.currentUrl = $location.path();
    $scope.menu = [{
      "title": "Sludinājumi",
      "link": "/jobs"
    }];

    $scope.userMenu = [
        {
        "title": "Pievienot sludinājumu",
        "link": "/jobs/create"
        },
        {
        "title": "Mani sludinājumi",
        "link": "/jobs/all"
        }];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
