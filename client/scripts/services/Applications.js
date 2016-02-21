'use strict';

angular.module('jobs')
    .factory('Applications', function ($resource) {
        return $resource('api/application/:applicationId', {
            applicationId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
