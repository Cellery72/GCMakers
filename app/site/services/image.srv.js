(function () {
    'use strict';
    app.service('img', ImageSrv);

    function ImageSrv() {
        var imgVm = this;
        imgVm.images = [];
        imgVm.resolveImages = resolveImages;

        function resolveImages(){
            for(var i=0;i<9;i++){
                var image = {
                    name: 'img'+i,
                    src: 'assets/images/gallery/img'+i+'.jpg'
                }
                if(imgVm.images.length !== 9){
                imgVm.images.push(image);
            }
            }

            console.log(imgVm.images)

            return imgVm.images;
        }
    };
})();
