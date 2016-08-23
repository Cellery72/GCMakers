(function () {
    'use strict';

    app.service('pageLoad', PageLoad);

    function PageLoad() {
        var self = this;

        $('.carousel').carousel({
            interval: 5000 //changes the speed
        })
    }
})();