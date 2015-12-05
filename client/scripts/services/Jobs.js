'use strict';

angular.module('jobs')
  .factory('Jobs', function ($resource) {
    return $resource('jobs/jobs/:jobId', {
      jobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
