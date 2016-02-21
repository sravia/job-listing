'use strict';

angular.module('jobs', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'http-auth-interceptor',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'angularMoment',
    'textAngular',
    'ngFileUpload'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider,nyaBsConfigProvider, uibPaginationConfig) {
    $urlRouterProvider.when("/jobs", "/jobs/list");
    $urlRouterProvider.otherwise('/jobs/list');
    $stateProvider
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'views/jobs/jobs.html',
            data: {
                authorization: false
            }
        })
        .state('jobs.list', {
            url: '/list',
            templateUrl: 'views/jobs/list.html',
            controller: 'JobsController',
            data: {
                authorization: false
            }
        })
        .state('jobs.create', {
            url: '/create',
            templateUrl: 'views/jobs/create.html',
            controller: 'CreateJobsController',
            data: {
                authorization: true
            }
        })
        .state('jobs.all', {
            url: '/all',
            templateUrl: 'views/jobs/all.html',
            controller: 'allJobsController',
            data: {
                authorization: true
            }
        })
        .state('jobs.edit', {
            url: '/edit/:jobId',
            templateUrl: 'views/jobs/edit.html',
            controller: 'editJobsController',
            data: {
                authorization: true
            }
        })
        .state('jobs.job', {
            url: '/job/:jobId',
            templateUrl: 'views/jobs/job.html',
            controller: 'JobController',
            data: {
                authorization: false
            }
        })
        .state('jobs.applications', {
            url: '/applications/:jobId',
            templateUrl: 'views/jobs/applications.html',
            controller: 'ApplicationsController',
            data: {
                authorization: true
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            data: {
                authorization: false
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignupController',
            data: {
                authorization: false
            }
        })
        .state('changepassword', {
            url: '/changepassword',
            templateUrl: 'views/changepassword.html',
            controller: 'ChangePasswordController',
            data: {
                authorization: true
            }
        })
        .state('retrievepassword', {
            url: '/retrievepassword',
            templateUrl: 'views/retrievepassword.html',
            controller: 'RetrievePasswordController',
            data: {
                authorization: false
            }
        });

        uibPaginationConfig.previousText="‹";
        uibPaginationConfig.nextText="›";
        uibPaginationConfig.firstText="«";
        uibPaginationConfig.lastText="»";

        nyaBsConfigProvider.setLocalizedText('lv', {
            defaultNoneSelection: 'Profesija...',
            noSearchResult: 'Nekas netika atrasts',
            numberItemSelected: ''
        });
        nyaBsConfigProvider.useLocale('lv');

        $locationProvider.html5Mode(true);
    })

    .run(function ($rootScope, $location, $cookieStore,$state,Session,Auth,amMoment) {
        amMoment.changeLocale('lv');

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var requireLogin = toState.data.authorization;

            if (requireLogin && $rootScope.currentUser == null) {
                event.preventDefault();
                $state.go("jobs.list");
            }

            Session.get(function(user) {
                $rootScope.currentUser = user;
                $cookieStore.put('user',user);
            },
            function(status) {
                $rootScope.currentUser = null;
                $cookieStore.remove('user');
            });
        });
    });