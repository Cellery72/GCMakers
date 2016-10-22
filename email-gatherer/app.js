'use strict';
var app = angular.module('makers', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            views: {
                splash: {
                    templateUrl: 'site/landing.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        });
});