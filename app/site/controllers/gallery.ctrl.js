(function () {
    'use strict';

    app.controller('GalleryCtrl', GalleryCtrl);

    function GalleryCtrl($state, img) {
        var galleryVm = this;
        galleryVm.previewSrc = 'assets/images/gallery/img0.jpg';
        galleryVm.images = [];

        galleryVm.preview = preview;
        galleryVm.getImages = getImages();

        function preview(image){
            galleryVm.previewSrc = image.src;
        }
        function getImages(){

            galleryVm.images = img.resolveImages();
        }
    }
})();
