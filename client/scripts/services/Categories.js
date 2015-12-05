'use strict';

angular.module('jobs')
    .factory('Categories', function ($resource) {
        return $resource('categories/category/:categoryId', {
            categoryId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
