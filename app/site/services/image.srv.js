(function () {
    'use strict';
    app.service('img', ImageSrv);

    function ImageSrv() {
        var imgVm = this;
        imgVm.images = [];
        imgVm.resolveImages = resolveImages;

        function resolveImages(){
            for(var i=0;i<7;i++){
                var image = {
                    name: 'img'+i,
                    src: 'assets/images/gallery/img'+i+'.jpg'
                }
                if(imgVm.images.length !== 7){
                imgVm.images.push(image);
            }
            }

            return imgVm.images;
        }
    };
})();
