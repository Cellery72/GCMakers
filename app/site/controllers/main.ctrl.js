(function() {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state) {
        var mainVm = this;
        mainVm.state = $state;

        mainVm.load = load;
        mainVm.go = go;

        mainVm.load();

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
                case '404':
                    $state.go('404');
                    break;
            }
        }

        function load() {
            $('.main-slider').addClass('animate-in');
            $('.preloader').remove();
        }
    }
})();
