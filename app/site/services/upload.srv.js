(function () {
    app.service('uploadSrv', UploadSrv);

    function UploadSrv($state, api, $http) {
<<<<<<< HEAD
        self = this
        self.http = $http;
        self.BASE_URL = 'http://localhost:8080';
        self.uploads = [];

        //public functions
        self.getUpload = getUpload;

        function getUpload() {
            console.log('bno');

            self.http.get(this.BASE_URL + '/uploads').then(function (res) {

                console.log(res.data.contentType);

            })
        }
    };

})();
=======
        self = this;
        self.BASE_URL = 'http://localhost:8080';
        self.upload;

        //public functions
        self.getUploads = getUploads;

        function getUploads() {

            return api.request('/uploads', {}, 'GET')
                .then(function (res) {
                    console.log(res.data);
                    self.upload = res.data;
                    return res.data.contentType;
                }, function (res) {
                    console.log(res);
                })
        }


    };

})();
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
