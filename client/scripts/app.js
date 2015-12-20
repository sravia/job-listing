'use strict';

angular.module('jobs', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'http-auth-interceptor',
    'ui.bootstrap',
    'nya.bootstrap.select',
    'angularMoment',
    'textAngular',
    'ngFileUpload'
]).config(function ($routeProvider, $locationProvider,nyaBsConfigProvider, uibPaginationConfig) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/jobs/jobs.html',
            controller: 'JobsController'
        })
        .when('/jobs', {
            templateUrl: 'views/jobs/jobs.html',
            controller: 'JobsController'
        })
        .when('/jobs/create', {
            templateUrl: 'views/jobs/create.html',
            controller: 'CreateJobsController',
            resolve: {
                hasAccess :function($location,Auth) {
                    return Auth.hasAccess();
                }
            }
        })
        .when('/jobs/all', {
            templateUrl: 'views/jobs/all.html',
            controller: 'allJobsController',
            resolve: {
                hasAccess :function($location,Auth) {
                    return Auth.hasAccess();
                }
            }
        })
        .when('/jobs/:jobId/edit', {
            templateUrl: 'views/jobs/edit.html',
            controller: 'JobsController'
        })
        .when('/jobs/:jobId', {
            templateUrl: 'views/jobs/job.html',
            controller: 'JobController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupController'
        })
        .otherwise({
            redirectTo: '/'
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

    .run(function ($rootScope, $location, $cookieStore,Auth,amMoment) {
        amMoment.changeLocale('lv');

        $rootScope.$on('$routeChangeStart', function (next, current) {
            console.log(Auth.getUser());
            console.log($cookieStore.get('user'));
        });
    });