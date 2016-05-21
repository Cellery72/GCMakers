(function () {

    'use strict';

    app.controller('EditCtrl', EditCtrl);

    function EditCtrl($state) {
        var editVm = this;
        editVm.file;
        editVm.go = go;
        editVm.addImage = addImage;
        editVm.img;

        function addImage() {
            var preview = document.querySelector('img');
            var f = document.querySelector('input[type=file]').files[0];
            var r = new FileReader();

            r.addEventListener("load", function () {
                preview.src = r.result;
            }, false);

            if (f) {
                editVm.file = r.readAsDataURL(f);
            }
            console.log(editVm.file);
        }

        function go(location) {
            switch (location) {
            case 'home':
                $state.go('home');
                break;
            case 'about':
                $state.go('about');
                break;
            case 'admin.panel':
                $state.go('admin.panel');
                break;

            }
        }
    }
})();
