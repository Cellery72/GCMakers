(function () {
    app.service('uploadSrv', UploadSrv);

    function UploadSrv($state, api, $http) {
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
