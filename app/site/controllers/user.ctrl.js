(function() {
    'use strict';
    app.controller('UserCtrl', UserCtrl);

    function UserCtrl($state, auth, userSrv, jwtHelper, uploadSrv, $rootScope, $location) {
        var userVm = this;
        userVm.email;
        userVm.admin;
        userVm.newPassword = null;

        function isValidMail(str) {
          //student
            var mailPattern = /^[a-zA-Z0-9._-]+@mygeorgian.ca$/;
            var mailPattern2 = /^[a-zA-Z0-9._-]+@student.georgianc.on.ca$/;
          //admin
            var mailPattern3 = /^[a-zA-Z0-9._-]+@georgiancollege.ca$/;
            return mailPattern.test(str) || mailPattern2.test(str) || mailPattern3.test(str);
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
            auth.register(payload);
            }
        }

        //LOGIN
        function login() {
            var payload = {
                email: userVm.email,
                password: userVm.password,
            }
            userVm.user = auth.login(payload);
        }

        //REFRESH
        function refresh() {
            $state.reload();
        }

        //LOGOUT
        function logout() {
            localStorage.removeItem('authToken');
            userVm.user = {};
            userVm.admin = false;
            $state.go('login');
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
