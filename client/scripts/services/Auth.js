'use strict';

angular.module('jobs')
    .factory('Auth', function Auth($location, $rootScope, Session, User, $cookieStore) {
        $rootScope.currentUser = $cookieStore.get('user') || null;

    return {
        getUser: function() {
            return $rootScope.currentUser;
        },

        isAdmin: function() {
            if($rootScope.currentUser == null){
                return false;
            }
            return $rootScope.currentUser.admin;
        },

        login: function(provider, user, callback) {
            var cb = callback || angular.noop;
            Session.save({
                provider: provider,
                email: user.email,
                admin: user.admin,
                password: user.password,
                rememberMe: user.rememberMe
            }, function(user) {
                $rootScope.currentUser = user;
                $cookieStore.put('user',user);
                return cb();
            }, function(err) {
                return cb(err.data);
            });
        },

        logout: function(callback) {
            var cb = callback || angular.noop;
            Session.delete(function(res) {
                $rootScope.currentUser = null;
                $cookieStore.remove('user');
                return cb();
            },
            function(err) {
                return cb(err.data);
            });
        },

        createUser: function(userinfo, callback) {
            var cb = callback || angular.noop;
            User.save(userinfo, function(user) {
                $rootScope.currentUser = user;
                return cb();
            },
            function(err) {
                return cb(err.data);
            });
        }
    };
  });