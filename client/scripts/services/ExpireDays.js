'use strict';

angular.module('jobs')
    .factory('ExpireDays', function ExpireDays($rootScope) {
        $rootScope.expireDays = [
            {id: 1, title: '3 dienas'},
            {id: 2, title: '1 nedēļa'},
            {id: 3, title: '2 nedēļas'}
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