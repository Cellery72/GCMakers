(function () {
    'use strict';

    app.service('api', ApiService)

    function ApiService($location, $http) {
        var self = this;
        self.BASE_URL = 'http://localhost:8080';

        self.request = request;

        function request(endpoint, data, method) {
            if (method == 'POST') {
                data = JSON.stringify(data);
                return $http.post(this.BASE_URL + endpoint, data)
            } else if (method == 'GET') {
                return $http.get(this.BASE_URL + endpoint);
            } else if (method == 'PUT') {
                data = JSON.stringify(data);
                return $http.put(this.BASE_URL + endpoint, data);
            } else if (method == 'DEL') {
                return $http.delete(this.BASE_URL + endpoint);
            }
        };

    };
})();