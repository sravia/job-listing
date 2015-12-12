'use strict';

angular.module('jobs')
    .factory('ExpireDays', function ExpireDays($rootScope) {
        $rootScope.expireDays = [
            {id: 0, count: 3, title: '3 dienas'},
            {id: 1, count: 7, title: '1 nedēļa'},
            {id: 2, count: 14, title: '2 nedēļas'}
        ];

        return {
            getExpireDays: function() {
                return $rootScope.expireDays;
            },
            getExpireDay: function(_id) {
                return $.grep($rootScope.expireDays, function(item){
                    return item.id == _id
                })[0];
            }
        };
    });