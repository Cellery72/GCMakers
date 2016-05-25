(function () {
    'use strict';

    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, userSrv, jwtHelper, uploadSrv, $firebaseAuth, $rootScope) {
        var adminVm = this;
        adminVm.email;
        adminVm.password = null;
        adminVm.auth_btn = "Login";
        adminVm.img;
        adminVm.users = userSrv.users;
        adminVm.availableOptions = [];
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



        //DECLARE FUNCTIONS
        adminVm.register = register;
        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.go = go;
        adminVm.refresh = refresh;
        adminVm.updateUser = updateUser;

        //REGISTER
        function register() {
            var payload = {
                firstName: adminVm.firstName,
                lastName: adminVm.lastName,
                email: adminVm.newEmail,
                admin: false,
                password: adminVm.newPassword,
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
            var payload = {
                email: adminVm.email,
                password: adminVm.password
            }
            api.request('/authenticate', payload, 'POST')
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

        //REFRESH
        function refresh() {
            $state.reload();
        }


        //LOGOUT
        function logout() {
            localStorage.removeItem('authToken');

            $state.go('admin.login');
        }

        //UPDATE USER
        function updateUser(user) {

            if (user.admin == 'Yes') {
                user.admin = true;
            } else {
                user.admin = false;
            }
            var payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin

            }
            console.log(user.admin)
            userSrv.updateUser(user._id, payload);
        }

        //DELETE USER

        //NAVIGATION
        function go(location) {
            switch (location) {
            case 'home':
                $state.go('home');
                break;
            case 'about':
                $state.go('about');
                break;
            case 'admin.panel':
                $state.go('admin.panel');
                break;
            case 'admin.home':
                $state.go('admin.home');
                break;
            case 'admin.about':
                $state.go('admin.about');
                break;
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




    }

})();