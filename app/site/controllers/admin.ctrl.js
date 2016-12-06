(function() {
    'use strict';
    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, jwtHelper, userSrv, auth) {
        var adminVm = this;
        adminVm.currentUser = auth.currentUser;


        //DECLARE FUNCTIONS
        adminVm.resolveUsers = resolveUsers();
        adminVm.isValidMail = isValidMail;
        adminVm.register = register;
        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.submitTime = submitTime;
        adminVm.updateUser = updateUser;
        adminVm.deleteUser = deleteUser;

        function resolveUsers() {
            api.request('/users', {}, 'GET')
                .then(function(res, err) {
                    if (err) {
                        console.log(err);
                    } else {
                        adminVm.users = res.data;
                        return res.data;
                    }
                })
        }

        function isValidMail(str) {
            var mailPattern = /^[a-zA-Z0-9._-]+@mygeorgian.ca$/;
            var mailPattern2 = /^[a-zA-Z0-9._-]+@student.georgianc.on.ca$/;
            var mailPattern3 = /^[a-zA-Z0-9._-]+@georgiancollege.ca$/;

            return mailPattern.test(str) || mailPattern2.test(str) || mailPattern3.test(str);
        }

        //REGISTER
        function register() {

            var isValid = adminVm.isValidMail(adminVm.newEmail);
            if (isValid == false) {
                alert('Please register with a Georgian College email address');
            } else {
                var user = {
                    firstName: adminVm.firstName,
                    lastName: adminVm.lastName,
                    email: adminVm.newEmail,
                    admin: false,
                    password: adminVm.newPassword,
                }
                auth.register(user);
            }
        }

        //LOGIN
        function login() {
            var user = {
                email: adminVm.email,
                password: adminVm.password,
            }
            auth.login(user);
        }


        // Logout user
        function logout() {
            localStorage.removeItem('authToken');
            $state.go('login');
        }

        // Submit a Meeting Time
        function submitTime(date, time) {
            adminVm.changeTime = false;
            var isoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0).toISOString();
            var payload = {
                date: isoDate,
            }
            api.request('/setMeeting', payload, 'PUT')
                .then(function(res) {
                    if (res.data.user == null) {
                        console.log(res.data.msg);
                    } else {
                        console.log(res.data.msg);
                    }
                })
        }



        //REFRESH
        function refresh() {
            $state.reload();
        }

        //UPDATE user
        function updateUser(user) {
            userSrv.updateUser(user._id, user);
        }

        //DELETE user
        function deleteUser(user) {
            userSrv.deleteUser(user._id);
            resolveUsers();
        }
    }
})();
