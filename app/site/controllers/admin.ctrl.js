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
        adminVm.users;

        //DECLARE FUNCTIONS
        adminVm.logout = logout;
        adminVm.go = go;
        adminVm.submitTime = submitTime;


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
            }
        }

        // Submit a Meeting Time
        function submitTime(date, time) {
            adminVm.changeTime = false;
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
