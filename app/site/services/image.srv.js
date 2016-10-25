(function () {
    'use strict';
    app.service('img', ImageSrv);

    function ImageSrv() {
        var imgVm = this;
        imgVm.images = [];

        this.resolveImages = resolveImages;

        function resolveImages(){

        for(var i=1; i<36; i++){
            var image = {
                index: i,
                name: 'img'+i,
                src: 'assets/dist/images/img'+i+'.jpg'
            }
            imgVm.images.push(image);

        }
        return imgVm.images;
    }
    };
})();
