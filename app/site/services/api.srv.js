(function () {
    'use strict';
    app.service('api', ApiService);

    function ApiService($location, $http) {
        this.http = $http;
        this.BASE_URL = 'http://localhost:8080';

        ApiService.prototype.request = function (endpoint, data, method) {
            if (method == 'POST') {
                data = JSON.stringify(data);
                return this.http.post(this.BASE_URL + endpoint, data);
            } else if (method == 'GET') {
                //data = this.formatGetData(data);
                return this.http.get(this.BASE_URL + endpoint + data);
            } else if (method == 'PUT') {
                data = JSON.stringify(data);
                return this.http.put(this.BASE_URL + endpoint, data);
            } else if (method == 'DEL') {
                return this.http.delete(this.BASE_URL + endpoint);
            }
        };

    };
})();
