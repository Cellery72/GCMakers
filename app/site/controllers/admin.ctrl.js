(function () {
    'use strict';

    app.controller('AdminCtrl', AdminCtrl);

<<<<<<< HEAD
    function AdminCtrl($state, api, jwtHelper, uploadSrv) {
=======
    function AdminCtrl($state, api, userSrv, jwtHelper, uploadSrv, $firebaseAuth, $rootScope) {
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
        var adminVm = this;
        adminVm.email;
        adminVm.password = null;
        adminVm.auth_btn = "Login";
        adminVm.img;
<<<<<<< HEAD

        if ($state.current.name == 'admin') {
            $state.go('admin.panel');

        }
        if (localStorage.authToken) {
            var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            if (decrypt_token.email) {
                console.log('Welcome ' + decrypt_token.firstName + '!');
            }
        }

        if ($state.current.name == 'admin' || ($state.current.name !== 'admin.register' && (localStorage.authToken == undefined || localStorage.authToken == null))) {
            $state.go('admin.login');
        }


=======
        adminVm.users = userSrv.users;
        adminVm.selected = true;
        //        adminVm.upload = uploadSrv.upload;


        if ($state.current.name == 'admin' || ($state.current.name !== 'admin.register' && (localStorage.authToken == undefined || localStorage.authToken == null))) {
            $state.go('admin.login');
        }
        if (localStorage.authToken) {
            try {
                var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);

                if (decrypt_token.email && $state.current.name == 'admin.panel') {
                    console.log('Welcome ' + decrypt_token.firstName + '!');
                } else if (decrypt_token.email && $state.current.name == 'admin.login') {
                    $state.go('admin.panel');

                }
            } catch (err) {
                delete localStorage.authToken
                console.log('Unauthorized');
            }
        }

>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383


        //DECLARE FUNCTIONS
        adminVm.register = register;
        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.go = go;
<<<<<<< HEAD
        adminVm.getUploads = getUploads;
=======
        adminVm.refresh = refresh;
        adminVm.updateUser = updateUser;
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383

        //REGISTER
        function register() {
            var payload = {
                firstName: adminVm.firstName,
                lastName: adminVm.lastName,
                email: adminVm.newEmail,
<<<<<<< HEAD
                password: adminVm.newPassword
=======
                admin: false,
                password: adminVm.newPassword,
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
            }
            api.request('/register', payload, 'POST')
                .then(function (res) {
                    //successful response
                    if (res.status == 200) {
                        //user exists
                        if (res.data.user == null) {
                            alert('This email address is already registered!');
                        } else {
                            console.log('User Created!')
                            $state.go('admin.panel');
                        }
                    }
                    adminVm.auth_btn = "Error";
                }, function () {
                    //error
                    adminVm.auth_btn = "Error";
                })
        }

        //LOGIN
        function login() {
<<<<<<< HEAD
            var user = {
                email: adminVm.email,
                password: adminVm.password
            }
            api.request('/authenticate', user, 'POST')
=======
            var payload = {
                email: adminVm.email,
                password: adminVm.password
            }
            api.request('/authenticate', payload, 'POST')
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
                .then(function (res) {
                    localStorage.loginEmail = adminVm.email;
                    if (res.status == 200) {
                        adminVm.auth_btn = "Success";
                        //user exists
                        if (res.data.user != null) {
                            $state.go('admin.panel');
                        } else {
                            alert(res.data.msg);
                        }
                    } else {
                        adminVm.auth_btn = 'Invalid Password';
                    }
                })
        }

<<<<<<< HEAD
=======
        //REFRESH
        function refresh() {
            $state.reload();
        }


>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
        //LOGOUT
        function logout() {
            localStorage.removeItem('authToken');

            $state.go('admin.login');
        }

<<<<<<< HEAD

=======
        //UPDATE USER
        function updateUser(_id) {

            var payload = {
                firstName: adminVm.firstName,
                lastName: adminVm.lastName,
                email: adminVm.email,
                admin: adminVm.admin

            }
            userSrv.updateUser();
        }

        //DELETE USER

        //NAVIGATION
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
        function go(location) {
            switch (location) {
            case 'home':
                $state.go('home');
                break;
            case 'about':
                $state.go('about');
                break;
<<<<<<< HEAD
=======
            case 'admin.panel':
                $state.go('admin.panel');
                break;
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
            case 'admin.home':
                $state.go('admin.home');
                break;
            case 'admin.about':
                $state.go('admin.about');
                break;
<<<<<<< HEAD
            }
        }

        function getUploads() {
            uploadSrv.getUpload();
            adminVm.img = uploadSrv.uploads;

        }
=======
            case 'admin.users':
                $state.go('admin.users');
                break;
            case 'admin.uploads':
                $state.go('admin.uploads');
                break;
            case 'admin.register':
                $state.go('admin.register');
                break;
            }

        }


>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383


    }

<<<<<<< HEAD
})();
=======
})();
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
