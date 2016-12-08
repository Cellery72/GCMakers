(function() {
    'use strict';
    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, jwtHelper, memberSrv, auth) {
        var adminVm = this;
        adminVm.currentUser = auth.currentUser;


        //DECLARE FUNCTIONS
        adminVm.resolveUsers = resolveUsers();
        adminVm.refresh = refresh;
        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.submitTime = submitTime;
        adminVm.updateMember = updateMember;
        adminVm.deleteMember = deleteMember;

        function resolveUsers() {
            api.request('/user/all', {}, 'GET')
                .then(function(res, err) {
                    if (err) {
                        console.log(err);
                    } else {
                        adminVm.users = res.data;
                        return res.data;
                    }
                })
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
                        //successful
                        console.log(res.data.msg);
                        adminVm.refresh();
                    } else {
                        //unsuccessful
                        console.log(res.data.msg);
                    }
                })
        }



        //REFRESH
        function refresh() {
            $state.reload();
        }

        //UPDATE user
        function updateMember(member) {
            memberSrv.updateMember(member._id, member);
        }

        //DELETE user
        function deleteMember(member) {
            memberSrv.deleteMember(member._id);
            resolveMembers();
        }
    }
})();
