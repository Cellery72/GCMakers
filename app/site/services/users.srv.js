(function () {
    'use strict';

    app.service('userSrv', UserService);

    function UserService($state, api) {

        var self = this;
        self.users = [];

        //functions
        self.getUsers = getUsers;
        self.updateUser = updateUser;
        self.deleteUser = deleteUser;

        function getUsers() {
            return api.request('/users', {}, 'GET')
                .then(function (res) {
                    self.users = res.data.users;
                    return res.data.users;
                }, function (res) {
                    console.log(res);
                    return;
                })


        }

        function updateUser(_id, payload) {
            return api.request('/update/' + _id, payload, 'PUT');
        }

        function deleteUser(_id) {
            return api.request('/delete/' + _id, {}, 'DEL');
        }
    };
})();