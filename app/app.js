'use strict';
var app = angular.module('makers', ['ui.router', 'ui.bootstrap', 'angular-jwt']);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    // defer no route to home route
    $urlRouterProvider.when('', '/');
    // defer all other garbage to 404
    $urlRouterProvider.otherwise('/404');

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
        .state('contact', {
            url: '/contact',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/contact.html',
                    controller: 'MainCtrl as ctrl'

                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        })
        .state('messageboard', {
            url: '/messageboard',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/messageboard.html',
                    controller: 'MainCtrl as ctrl'

                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        })
        .state('gallery', {
            url: '/gallery',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/gallery.html',
                    controller: 'MainCtrl as ctrl'
                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        })
        .state('login', {
                url: '/login',
                views: {
                    header: {
                        templateUrl: 'site/partials/common/header.html',
                        controller: 'MainCtrl as ctrl'
                    },
                    layout: {
                        templateUrl: 'site/partials/common/login.html',
                        controller: 'UserCtrl as ctrl'
                    },
                    footer: {
                        templateUrl: 'site/partials/common/footer.html',
                        controller: 'MainCtrl as ctrl'
                    }

                }
        })
        .state('register', {
                url: '/register',
                views: {
                    header: {
                        templateUrl: 'site/partials/common/header.html',
                        controller: 'MainCtrl as ctrl'
                    },
                    layout: {
                        templateUrl: 'site/partials/common/register.html',
                        controller: 'UserCtrl as ctrl'
                    },
                    footer: {
                        templateUrl: 'site/partials/common/footer.html',
                        controller: 'MainCtrl as ctrl'
                    }

                }
        })
        .state('panel', {
            url: '/panel',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/common/panel.html',
                    controller: 'UserCtrl as ctrl'

                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        })
        .state('admin', {
            url: '/admin',
            views: {
                layout: {
                    templateUrl: 'site/partials/admin/admin.html',
                    controller: 'AdminCtrl as ctrl'
                }
            }
        })
        .state('admin.panel', {
            url: '/panel',
            templateUrl: 'site/partials/admin/admin.panel.html',
            parent: 'admin'
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: 'site/partials/admin/admin.users.html',
            parent: 'admin'
        })
        .state('404', {
            url: '/404',
            views: {
                header: {
                    templateUrl: 'site/partials/common/header.html',
                    controller: 'MainCtrl as ctrl'
                },
                layout: {
                    templateUrl: 'site/partials/404.html',
                    controller: 'MainCtrl as ctrl'
                },
                footer: {
                    templateUrl: 'site/partials/common/footer.html',
                    controller: 'MainCtrl as ctrl'
                }
            }
        });

    $httpProvider.interceptors.push(function(jwtHelper) {
        return {
            request: function(config) {
                config.headers.authentication = localStorage.authToken;
                return config;
            },
            response: function(response) {
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
        };
    });
});
