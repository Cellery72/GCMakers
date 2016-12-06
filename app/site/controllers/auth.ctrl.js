(function() {
    'use strict';

    app.controller('AuthCtrl', AuthCtrl);

    function AuthCtrl($state, api, jwtHelper) {
        var authVm = this;
        authVm.email;
        authVm.password = null;
        authVm.auth_btn = "Login";
        authVm.img;
        authVm.changeTime = false;
        authVm.date;

        if (localStorage.authToken != null) {
            var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            if (decrypt_token.email) {
                console.log('Welcome ' + decrypt_token.firstName + '!');
            }
        }

        //DECLARE FUNCTIONS
        authVm.register = register;
        authVm.login = login;
        authVm.logout = logout;

        //REGISTER
        function register() {
            console.log('hi')
            var payload = {
                firstName: authVm.firstName,
                lastName: authVm.lastName,
                email: authVm.newEmail,
                password: authVm.newPassword
            }
            api.request('/register', payload, 'POST')
                .then(function(res) {
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
                    authVm.auth_btn = "Error";
                }, function() {
                    //error
                    authVm.auth_btn = "Error";
                })
        }

        //LOGIN
        function login() {
            var user = {
                email: authVm.email,
                password: authVm.password
            }
            api.request('/authenticate', user, 'POST')
                .then(function(res) {
                    localStorage.loginEmail = authVm.email;
                    if (res.status == 200) {
                        authVm.auth_btn = "Success";
                        //user exists
                        if (res.data.user != null) {
                                $state.go('admin.panel');
                            }
                        } else {
                            alert(res.data.msg);
                        }
                    } else {
                        authVm.auth_btn = 'Invalid Password';
                    }
                })
        }

        //LOGOUT
        function logout() {
            localStorage.removeItem('authToken');

            $state.go('login');
        }




    }
})();
