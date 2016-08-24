(function() {
    'use strict';

    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, jwtHelper, uploadSrv) {
        var adminVm = this;
        adminVm.email;
        adminVm.password = null;
        adminVm.auth_btn = "Login";
        adminVm.img;
        adminVm.changeTime = false;
        adminVm.date;
        if ($state.current.name == 'admin') {
            $state.go('admin.panel');

        }
        if (localStorage.authToken != null) {
            var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            if (decrypt_token.email) {
                console.log('Welcome ' + decrypt_token.firstName + '!');
            }
        }

        if ($state.current.name == 'admin' || ($state.current.name !== 'admin.register' && (localStorage.authToken == undefined || localStorage.authToken == null))) {
            $state.go('admin.login');
        }




        //DECLARE FUNCTIONS
        adminVm.register = register;
        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.go = go;
        adminVm.getUploads = getUploads;
        adminVm.submitTime = submitTime;

        //REGISTER
        function register() {
            var payload = {
                firstName: adminVm.firstName,
                lastName: adminVm.lastName,
                email: adminVm.newEmail,
                password: adminVm.newPassword
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
                    adminVm.auth_btn = "Error";
                }, function() {
                    //error
                    adminVm.auth_btn = "Error";
                })
        }

        //LOGIN
        function login() {
            var user = {
                email: adminVm.email,
                password: adminVm.password
            }
            api.request('/authenticate', user, 'POST')
                .then(function(res) {
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

        //LOGOUT
        function logout() {
            localStorage.removeItem('authToken');

            $state.go('admin.login');
        }


        function go(location) {
            switch (location) {
                case 'home':
                    $state.go('home');
                    break;
                case 'about':
                    $state.go('about');
                    break;
                case 'admin.home':
                    $state.go('admin.home');
                    break;
                case 'admin.about':
                    $state.go('admin.about');
                    break;
            }
        }

        function getUploads() {
            uploadSrv.getUpload();
            adminVm.img = uploadSrv.uploads;

        }

        function submitTime(date, time) {
            adminVm.changeTime = false;
            // date = date.toDateString();
            // time = time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            // console.log("Changed meeting time to: " + date + " at " + time);
            var isoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0).toISOString();
            var payload = {
                date: isoDate,
            }
            api.request('/setMeeting', payload, 'POST')
                .then(function(res) {
                    if (res.data.user == null) {
                        console.log(res.data.msg);
                    } else {
                        console.log(res.data.msg);
                    }
                })
        }


    }
})();
