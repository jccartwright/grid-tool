'use strict';

/**
 * @ngdoc overview
 * @name gridToolApp
 * @description
 * # gridToolApp
 *
 * Main module of the application.
 */
angular
    .module('gridToolApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'esri.map'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl',
                controllerAs: 'contact'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
