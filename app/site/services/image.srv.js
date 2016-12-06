(function () {
    'use strict';
    app.service('img', ImageSrv);

    function ImageSrv() {
        var imgVm = this;
        imgVm.images = [];
        imgVm.sliderIndex =0;
        imgVm.resolveImages = resolveImages;
        imgVm.slider = slider;
        imgVm.count = 0;

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
        function slider(){

                if(imgVm.sliderIndex == 5){
                    imgVm.sliderIndex=0;
                }else{
                    imgVm.sliderIndex++;
                }
                imgVm.count++;

            return imgVm.sliderIndex;
        }
    };
})();
