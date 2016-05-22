'use strict';
var app = angular.module('makers', ['ui.router', 'ui.bootstrap', 'angular-jwt', 'firebase']);

app.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/home.html',
                    controller: 'MainCtrl as ctrl'

                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }

        })
        .state('about', {
            url: '/about',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/about.html',
                    controller: 'MainCtrl as ctrl'

                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        })
        .state('admin', {
            url: '/admin',
            controller: 'AdminCtrl as ctrl',
            views: {
                layout: {
                    templateUrl: 'site/partials/admin/admin.html',
                    controller: 'AdminCtrl as ctrl'
                }
            }
        })
        .state('admin.login', {
            url: '/login',
            templateUrl: 'site/partials/admin/admin.login.html',
            controller: 'AdminCtrl as ctrl',
            parent: 'admin'
        })
        .state('admin.register', {
            url: '/register',
            templateUrl: 'site/partials/admin/admin.register.html',
            controller: 'AdminCtrl as ctrl',
            parent: 'admin'
        })
        .state('admin.panel', {
            url: '/panel',
            templateUrl: 'site/partials/admin/admin.panel.html',
            controller: 'AdminCtrl as ctrl',
            parent: 'admin'
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: 'site/partials/admin/admin.users.html',
            controller: 'AdminCtrl as ctrl',
            parent: 'admin',
            resolve: {
                users: function (userSrv) {
                    return userSrv.getUsers();
                }
            }

        })
        .state('admin.uploads', {
            url: '/uploads',
            templateUrl: 'site/partials/admin/admin.uploads.html',
            controller: 'AdminCtrl as ctrl',
            parent: 'admin'
                //            resolve: {
                //                upload: function (uploadSrv) {
                //                    return uploadSrv.getUploads();
                //                }
                //            }

        })
        .state('admin.home', {
            url: '/home',
            templateUrl: 'site/partials/admin/admin.home.html',
            controller: 'EditCtrl as ctrl',
            parent: 'admin'
        })
        .state('admin.about', {
            url: '/about',
            templateUrl: 'site/partials/admin/admin.html',
            controller: 'EditCtrl as ctrl',
            parent: 'admin'
        })

    $httpProvider.interceptors.push(function (jwtHelper) {
        return {
            request: function (config) {
                config.headers.authentication = localStorage.authToken;
                return config;
            },
            response: function (response) {
                var auth_token = response.headers('authentication');
                if (auth_token) {
                    var decrypt_token = jwtHelper.decodeToken(auth_token);
                    if (decrypt_token.email) {
                        localStorage.authToken = auth_token;
                    } else {
                        localStorage.authToken = null;
                    }
                }
                return response;
            }
        }
    })
});