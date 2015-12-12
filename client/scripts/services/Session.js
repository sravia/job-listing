'use strict';

angular.module('jobs')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });

