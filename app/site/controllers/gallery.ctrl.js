(function () {
    'use strict';

    app.controller('GalleryCtrl', GalleryCtrl);

    function GalleryCtrl($state) {
        var galleryVm = this;
        galleryVm.images = [{
            name: 'img1',
            src: 'assets/images/gallery/img1.jpg'
        },
        {
            name: 'img2',
            src: 'assets/images/gallery/img2.jpg'
        },
        {
            name: 'img3',
            src: 'assets/images/gallery/img3.jpg'
        },
        {
            name: 'img4',
            src: 'assets/images/gallery/img4.jpg'
        },
        {
            name: 'img5',
            src: 'assets/images/gallery/img5.jpg'
        },
        {
            name: 'img6',
            src: 'assets/images/gallery/img6.jpg'
        }

    ]
        galleryVm.previewSrc = 'assets/images/gallery/img6.jpg';

        galleryVm.preview = preview;

        function preview(image){
            galleryVm.previewSrc = image.src;
        }
    }
})();
