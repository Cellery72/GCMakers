(function () {
    'use strict';
    app.service('img', ImageSrv);

    function ImageSrv() {
        var imgVm = this;
        imgVm.images = [
            {
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
            },
            {
                name: 'img7',
                src: 'assets/images/gallery/img7.jpg'
            },
            {
                name: 'img8',
                src: 'assets/images/gallery/img8.jpg'
            },
            {
                name: 'img9',
                src: 'assets/images/gallery/img9.jpg'
            },
            {
                name: 'img10',
                src: 'assets/images/gallery/img10.jpg'
            },
        ];

    };
})();
