(function() {
    'use strict';


    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state, pageLoad) {
        var mainVm = this;
        mainVm.state = $state;

        mainVm.pageLoad = pageLoad;
        mainVm.go = go;



        function go(location) {
            switch (location) {
                case 'home':
                    $state.go('home');
                    break;
                case 'about':
                    $state.go('about');
                    break;
                case 'contact':
                    $state.go('contact');
                    break;
                case 'messageboard':
                    $state.go('messageboard');
                    break;
                case 'admin.panel':
                    $state.go('admin.panel');
                    break;
            }

            function pageLoad() {
                mainVm.pageLoad.carousel();
            }
        }

    }
})();
