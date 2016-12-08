(function() {
    'use strict';

    app.service('nav', NavService);

    function NavService($state, img) {
        var self = this;

        self.go = go;

        function go(location) {
            switch (location) {
                case 'home':
                    img.sliderIndex = 0;
                    $state.go('home');
                    window.scrollTo(0, 0);
                    break;
                case 'about':
                    $state.go('about');
                    window.scrollTo(0, 0);
                    break;
                case 'contact':
                    $state.go('contact');
                    window.scrollTo(0, 0);
                    break;
                case 'messageboard':
                    $state.go('messageboard');
                    window.scrollTo(0, 0);
                    break;
                case 'gallery':
                    $state.go('gallery');
                    window.scrollTo(0, 0);
                    break;
                case 'signup':
                    $state.go('signup');
                    window.scrollTo(0, 0);
                    break;
                case 'admin':
                      $state.go('admin');
                      window.scrollTo(0, 0);
                      break;
                case '404':
                    $state.go('404');
                    window.scrollTo(0, 0);
                    break;
            }
        }

      }
})();
