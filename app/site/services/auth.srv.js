(function() {
    'use strict';

    app.service('auth', AuthService);

    function AuthService(api, $state) {
        var self = this;
        self.currentUser;

        //initialize functions
        this.register = register;
        this.login = login;
        this.logout = logout;
        this.isAuthenticated = isAuthenticated

        //register
        function register(payload) {
            api.request('/register', payload, 'POST')
                .then(function(res) {
                    //successful response
                    if (res.status == 200) {
                        if (res.data.user == null) {
                            alert('This email address is already registered!');
                        } else {
                            login(payload);
                            console.log(res.data.msg);
                        }
                    }
                    //error
                } , function(){
                    console.log('error');
                })
        }
        //login
        function login(payload) {
            api.request('/login', payload, 'POST')
                .then(function(res) {
                    localStorage.loginEmail = payload.email;
                    if (res.status == 200) {
                        //user exists
                        if (res.data.user != null) {
                            self.currentUser = {
                                firstName: res.data.user.firstName,
                                lastName: res.data.user.lastName,
                                email: res.data.user.email,
                                pass: res.data.user.password,
                                admin: res.data.user.admin
                            }
                                $state.go('panel');
                        } else {
                            alert(res.data.msg);
                        }
                    } else
                        alert('Invalid Password');
                });
        }
        //logout
        function logout() {
            localStorage.removeItem('authToken');
            self.currentUser = {};
            self.currentUser.admin = false;
            $state.go('login');
        }
        //check if a user is authenticated
        function isAuthenticated() {

        }
    }
})();
