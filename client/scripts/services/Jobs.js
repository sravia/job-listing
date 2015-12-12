'use strict';

angular.module('jobs')
  .factory('Jobs', function ($resource) {
    return $resource('api/jobs/:jobId', {
      jobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
