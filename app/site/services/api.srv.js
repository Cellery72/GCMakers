(function () {
    'use strict';
    app.service('api', ApiService);

    function ApiService($location, $http) {
        this.http = $http;
        var protocol = $location.$$protocol,
            host = $location.$$host,
            port = $location.$$port;

        this.BASE_URL = protocol+'://'+host+':'+port;
        //initialize functions
        this.request = request;

        function request(endpoint, data, method) {
            if (method == 'POST') {
                data = JSON.stringify(data);
                return this.http.post(this.BASE_URL + endpoint, data);
            } else if (method == 'GET') {
                //data = this.formatGetData(data);
                return this.http.get(this.BASE_URL + endpoint);
            } else if (method == 'PUT') {
                data = JSON.stringify(data);
                return this.http.put(this.BASE_URL + endpoint, data);
            } else if (method == 'DEL') {
                return this.http.delete(this.BASE_URL + endpoint);
            }
        };


    };
})();
