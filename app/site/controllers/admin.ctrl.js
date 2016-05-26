(function () {
    'use strict';

    app.controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($state, api, userSrv, jwtHelper, uploadSrv, $rootScope) {
        var adminVm = this;
        adminVm.email;
        adminVm.password = null;
        adminVm.auth_btn = "Login";
        adminVm.img;
        adminVm.users = userSrv.users;
        adminVm.adminOptions = [true, false];
        //        adminVm.upload = uploadSrv.upload;


        if (($state.current.name == 'admin' || $state.current.name == 'admin.panel') && (localStorage.authToken == undefined || localStorage.authToken == null)) {
            $state.go('user.login');
        }
        if (localStorage.authToken) {
            try {
                var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);

                if (!decrypt_token.admin && $state.current.name == 'admin.panel') {
                    $state.go('user.panel');
                    console.log('Not Admin');
                } else if (decrypt_token.email && $state.current.name == 'user.login') {
                    $state.go('user.panel');
                    console.log('Logged In')

                }
            } catch (err) {
                delete localStorage.authToken
                console.log('Unauthorized');
            }
        }





        //DECLARE FUNCTIONS
        //        adminVm.register = register;
        //        adminVm.login = login;
        adminVm.logout = logout;
        adminVm.go = go;
        adminVm.refresh = refresh;
        adminVm.updateUser = updateUser;
        adminVm.deleteUser = deleteUser;

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
        function updateUser(user) {

            var payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                admin: user.admin
            }

            userSrv.updateUser(user._id, payload);
        }

        //DELETE USER
        function deleteUser(user) {
            userSrv.deleteUser(user._id).then(function () {
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
            case 'user.register':
                $state.go('user.register');
                break;
            case 'user.panel':
                $state.go('user.panel');
                break;
            }

        }




    }

})();