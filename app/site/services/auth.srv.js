(function() {
    'use strict';

    app.service('auth', AuthService);

    function AuthService(api, $state, jwtHelper, $rootScope) {
        var self = this;
        self.currentUser;

        //initialize functions
        self.register = register;
        self.update = update;
        self.login = login;
        self.logout = logout;
        self.isAuthenticated = isAuthenticated;
        self.isAdmin = isAdmin;
        self.resolveUser = resolveUser;


        //register
        function register(payload) {
            api.request('/user/register', payload, 'PUT')
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

        function update(payload){
            api.request('/user/update', payload, 'PUT')
            .then(function(res){

            });
        }
        //login
        function login(payload) {
            api.request('/user/login', payload, 'POST')
                .then(function(res) {
                    localStorage.loginEmail = payload.email;
                    if (res.status == 200) {
                        //user exists
                        if (res.data.user != null) {
                            self.currentUser = {
                                firstName: res.data.user.firstName,
                                lastName: res.data.user.lastName,
                                email: res.data.user.email,
                                pass: res.data.user.password
                            }
                            $state.go('admin');
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
            $state.go('login');
        }
        //check if a user is authenticated
        function isAuthenticated() {
            try {
                var decrypt_token;
                if(decrypt_token == undefined){
                    decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            }
                if(decrypt_token.email){
                    return true;
                }else{
                    return false;
                }
            }catch(err){
                delete localStorage.authToken;
                console.log('Unable to Authorize User Access');
                if($state.current.name == 'login' || $state.current.name == 'admin' || $state.current.name == 'register'){
                    $state.go($rootScope.previousState());
                }else{
                    $state.go('login');
            }
            }
        }

        function isAdmin(){
            try{
                var decrypt_token;
                if(decrypt_token == undefined){
                    var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            }
                if(decrypt_token.admin){
                    return true;
                }else{
                    $state.go($rootScope.previousState())
                    return false;
                }
            }catch(err){
                delete localStorage.authToken;
                console.log('Unable to Authorize Admin Access');
                if($state.current.name == 'login' || $state.current.name == 'register'){
                    $state.go($rootScope.previousState());
                }else{
                    $state.go('login');
            }
            }
        }
        function resolveUser(){
            try{
                var decrypt_token;
                if(decrypt_token == undefined){
                    var decrypt_token = jwtHelper.decodeToken(localStorage.authToken);
            }
                if(decrypt_token.email){
                    self.currentUser = decrypt_token;
                    return decrypt_token;
                }else{
                    self.currentUser = undefined;
                    return undefined;
                }
            }catch(err){
                console.log('Not authenticated');
            }
        }


    }
})();
