(function () {
    app.service('uploadSrv', UploadSrv);

    function UploadSrv($state, api, $http) {
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