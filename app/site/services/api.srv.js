(function () {
    'use strict';

    app.service('api', ApiService)

    function ApiService($location, $http) {
<<<<<<< HEAD
        this.http = $http;
        this.BASE_URL = 'http://localhost:8080';



        ApiService.prototype.request = function (endpoint, data, method) {
            if (method == 'POST') {
                data = JSON.stringify(data);
                return this.http.post(this.BASE_URL + endpoint, data)
            } else if (method == 'GET') {
                data = this.formatGetData(data);
                return this.http.get(this.BASE_URL + endpoint + data);
            } else if (method == 'PUT') {
                data = JSON.stringify(data);
                return this.http.put(this.BASE_URL + endpoint, data);
            } else if (method == 'DEL') {
                return this.http.delete(this.BASE_URL + endpoint);
=======
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
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
            }
        };

    };
<<<<<<< HEAD
})();
=======
})();
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
