(function () {
    'use strict';
    app.service('auth', AuthService);

    function AuthService(api, $state) {
        //declare functions
        this.register = register;
        this.login = login;
        this.authenticated = authenticated;

        //Function to register a user
        function register(payload){
          api.request('/register',payload,'POST')
          .then(function(res){
            if (res.status == 200) {
              if (res.data.user == null) {
                console.log(res.data.user);
                alert('This email address is already registered!');
              } else {
                  login(payload);
              }
            }else{
              console.log(err);
            }
          });

        }

        //Function to a
        function login(payload){
          api.request('/authenticate', payload, 'POST')
              .then(function(res) {
                  localStorage.loginEmail = res.data.email;
                  if (res.status == 200) {

                      //user exists
                      if (res.data.user != null) {
                        var user = {
                             firstName: res.data.user.firstName,
                             lastName: res.data.user.lastName,
                             email: res.data.user.email,
                             pass: res.data.user.password
                         }
                                   $state.go('panel');
                        return user;

                      } else {
                          alert(res.data.msg);
                      }
                  } else
                      alert('Invalid Password');
              });
        }

        function authenticated(user){
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
        }

    };
})();
