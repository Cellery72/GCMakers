(function () {
    'use strict';

    app.service('userSrv', UserService);

    function UserService($state, api) {
        var self = this;
        self.users = [];
        //functions
        self.getUsers = getUsers;
        self.updateUser = updateUser;

        function getUsers(){
            api.request('/users',{},'GET')
            .then(function(res,err){
                if(err){
                    console.log(err);
                }else{
                    self.users = res.data;
                    return res.data;
            }
            })
        }
        function updateUser(_id, user) {
         api.request('/users/'+_id, user, 'POST')
            .then(function(res,err){
                if(err){
                    console.log(err);
                }else{
                    console.log(res);
                }
            });
        }
    };
})();
