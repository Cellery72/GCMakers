(function() {
    'use strict';
    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, jwtHelper, userSrv) {
        var adminVm = this;
        adminVm.users = [];
        console.log(adminVm.users);
        //DECLARE FUNCTIONS
        adminVm.resolveUsers = resolveUsers();


        adminVm.logout = logout;
        adminVm.go = go;
        adminVm.submitTime = submitTime;
        adminVm.updateUser = updateUser;

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
        // Logout user
        function logout() {
            localStorage.removeItem('authToken');
            $state.go('login');
        }

        // Navigational Function
        function go(location) {
            switch (location) {
                case 'home':
                    $state.go('home');
                    break;
                case 'about':
                    $state.go('about');
                    break;
                case 'panel':
                    $state.go('panel');
                    break;
                case 'admin':
                    $state.go('admin');
                    break;
                case 'users':
                    $state.go('users');
            }
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
        function updateUser(user){
            userSrv.updateUser(user._id, user);
        }
    }
})();
