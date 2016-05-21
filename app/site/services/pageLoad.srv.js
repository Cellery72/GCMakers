(function () {
    'use strict';

    app.service('pageLoad', PageLoad);

    function PageLoad() {
        var self = this;
        self.carousel = carousel;

        function carousel() {
            $('.carousel').carousel({
                interval: 5000 //changes the speed
            })
        }
    }
})();
