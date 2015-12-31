'use strict';

angular.module('jobs')
    .factory('WorkTimes', function WorkTimes($rootScope) {
        $rootScope.worktimes = [
            {id: 0, css:'fulltime', title: 'Pilna slodze'},
            {id: 1, css:'parttime', title: 'Pusslodze'},
            {id: 2, css:'internship', title: 'Prakse'}
        ];

        return {
            getWorkTimes: function() {
                return $rootScope.worktimes;
            },
            getWorkTime: function(_id) {
                return $.grep($rootScope.worktimes, function(item){
                    return item.id == _id
                })[0];
            }
        };
    });