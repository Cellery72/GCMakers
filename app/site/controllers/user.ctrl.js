(function() {
    'use strict';

    app.controller('UserCtrl', UserCtrl);

    function UserCtrl($state, api, userSrv, jwtHelper, uploadSrv, $rootScope) {
        var userVm = this;
        userVm.email;
        userVm.admin;
        userVm.user;
        userVm.newPassword = null;

        function isValidMail(str) {
            var mailPattern = /^[a-zA-Z0-9._-]+@georgiancollege.ca$/;
            return mailPattern.test(str)
        }

        if ($state.current.name == 'user') {
            $state.go('user.login');
        } else if (($state.current.name == 'user' || $state.current.name !== 'user.register') && (localStorage.authToken == undefined || localStorage.authToken == null)) {
            $state.go('user.login');
        }

        if (localStorage.authToken) {
            try {
                var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);

                if (decrypt_token.email && $state.current.name == 'user.panel') {

                    userVm.user = decrypt_token;
                    if (decrypt_token.admin) {
                        console.log('Welcome Admin');
                        userVm.admin = true;
                    } else {
                        userVm.admin = false;
                    }
                } else if (decrypt_token.email && $state.current.name == 'user.login') {
                    $state.go('user.panel');
                    console.log('Logged In');
                    userVm.admin = false;

                }
            } catch (err) {
                delete localStorage.authToken
                console.log('Unauthorized');
            }
        }

        //DECLARE FUNCTIONS
        userVm.register = register;
        userVm.login = login;
        userVm.logout = logout;
        userVm.go = go;
        userVm.updateUser = updateUser;

        //REGISTER
        function register() {

            var isValid = isValidMail(userVm.newEmail);
            if (isValid == false) {
                alert('Please register with a Georgian College email address');
            } else {
                var payload = {
                    firstName: userVm.firstName,
                    lastName: userVm.lastName,
                    email: userVm.newEmail,
                    admin: false,
                    password: userVm.newPassword,
                }
                api.request('/register', payload, 'POST')
                    .then(function(res) {
                        //successful response
                        if (res.status == 200) {

                            //user exists
                            if (res.data.user == null) {
                                alert('This email address is already registered!');
                            } else {
                                $state.go('user.panel');
                            }
                        }
                        userVm.auth_btn = "Error";
                    }, function() {
                        //error
                        userVm.auth_btn = "Error";
                    });
            }
        }

        //LOGIN
        function login() {
            var payload = {
                email: userVm.email,
                password: userVm.password
            }
            api.request('/authenticate', payload, 'POST')
                .then(function(res) {
                    localStorage.loginEmail = userVm.email;

                    if (res.status == 200) {
                        userVm.auth_btn = "Success";
                        //user exists
                        if (res.data.user != null) {
                            $state.go('user.panel');
                        } else {
                            alert(res.data.msg);
                        }
                    } else {
                        alert('Invalid Password');
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

            $state.go('user.login');
        }

        //UPDATE USER
        function updateUser() {
            var payload = {
                firstName: userVm.user.firstName,
                lastName: userVm.user.lastName,
                email: userVm.user.email,
                password: userVm.newPassword
            }

            userSrv.updateUser(userVm.user._id, payload);
        }
        //DELETE USER
        function deleteUser() {
            userSrv.deleteUser(userVm.user._id).then(function() {
                adminVm.refresh();
            })
        }

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
            }

        }


    }
})();
