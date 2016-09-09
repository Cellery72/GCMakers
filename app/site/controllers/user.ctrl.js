(function() {
    'use strict';
    app.controller('UserCtrl', UserCtrl);

    function UserCtrl($state, userSrv, api, auth, jwtHelper) {
        var userVm = this;
        userVm.email;
        userVm.admin;
        userVm.newPassword = null;

        function isValidMail(str) {
            var mailPattern = /^[a-zA-Z0-9._-]+@mygeorgian.ca$/;
            var mailPattern2 = /^[a-zA-Z0-9._-]+@student.georgianc.on.ca$/;
            var mailPattern3 = /^[a-zA-Z0-9._-]+@georgiancollege.ca$/;

            return mailPattern.test(str) || mailPattern2.test(str) || mailPattern3.test(str);
        }


        if ($state.current.name == 'panel' && localStorage.authToken != null) {
            try {
                var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);

                if (decrypt_token.email && $state.current.name == 'panel') {
                    userVm.user = decrypt_token;
                    if (decrypt_token.admin) {
                        console.log('Welcome Admin');
                        userVm.admin = true;
                    } else {
                        userVm.admin = false;
                    }
                } else if (decrypt_token.email && $state.current.name == 'login') {
                    $state.go('panel');
                    console.log('Logged In');
                }
            } catch (err) {
                delete localStorage.authToken
                console.log('Unauthorized');
            }
        }

        if ($state.current.name !== 'register' && (localStorage.authToken == undefined || localStorage.authToken == null)) {
            $state.go('login');
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
                var user = {
                    firstName: userVm.firstName,
                    lastName: userVm.lastName,
                    email: userVm.newEmail,
                    admin: false,
                    password: userVm.newPassword,
                }
                auth.register(user);
            }
        }

        //LOGIN
        function login() {
            var user = {
                email: userVm.email,
                password: userVm.password,
            }
            auth.login(user);
        }

        //REFRESH
        function refresh() {
            $state.reload();
        }

        //LOGOUT
        function logout() {
            auth.logout();

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
                userVm.refresh();
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
                case 'register':
                    $state.go('register');
                    break;
                case 'login':
                    $state.go('login');
                    break;
                case 'panel':
                    $state.go('panel');
                    break;
                case 'admin.panel':
                    $state.go('admin.panel');
                    break;
            }
        }
    }
})();
