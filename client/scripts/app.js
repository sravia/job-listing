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
            controller: 'CreateJobsController'
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
        .when('/admin', {
            templateUrl: 'views/admin/jobs.html',
            controller: 'AdminJobsController'
        })
        .when('/admin/categories', {
            templateUrl: 'views/admin/categories.html',
            controller: 'AdminCategoriesController'
        })
        .otherwise({
            redirectTo: '/'
        });

        nyaBsConfigProvider.setLocalizedText('lv', {
            defaultNoneSelection: 'Profesija...',
            noSearchResult: 'Nekas netika atrasts',
            numberItemSelected: ''
        });

        uibPaginationConfig.previousText="‹";
        uibPaginationConfig.nextText="›";
        uibPaginationConfig.firstText="«";
        uibPaginationConfig.lastText="»";

        nyaBsConfigProvider.useLocale('lv');

        $locationProvider.html5Mode(true);
    })

  .run(function ($rootScope, $location, Auth,amMoment) {
    amMoment.changeLocale('lv');

    $rootScope.$watch('currentUser', function(currentUser) {
      if (!currentUser) {// && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )
        Auth.currentUser();
      }
    });

  });