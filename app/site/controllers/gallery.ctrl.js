(function () {
    'use strict';

    app.controller('GalleryCtrl', GalleryCtrl);

    function GalleryCtrl($state, img) {
        var galleryVm = this;
        galleryVm.previewSrc = 'assets/images/gallery/img0.jpg';
        galleryVm.images = img.images;


        galleryVm.getImages = getImages;
        galleryVm.preview = preview;

        if(galleryVm.images == null || galleryVm.images == undefined || galleryVm.images.length == 0){
            galleryVm.getImages();
        }
        function getImages(){

            galleryVm.images = img.resolveImages();
        }
        function preview(image){
            galleryVm.previewSrc = image.src;
        }

    }
})();
