(function () {
    'use strict';

    app.controller('NavCtrl', NavCtrl);

    function NavCtrl($state, img) {
        var navVm = this;
        navVm.meetingRoom = "E212";
        navVm.meetingDate = "Monday, November 7th, 2016";
        navVm.meetingTime = "10:00AM"
        // navVm.meetingInfo = "Next Meeting: " + navVm.meetingDate + ' | ' + navVm.meetingTime + ' | ' + navVm.meetingRoom;
        navVm.meetingInfo = "Next Meeting: There are currently no meetings scheduled"

        navVm.go = go;

        function go(location) {
            switch (location) {
                case 'home':
                    img.sliderIndex = 0;
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
                case 'gallery':
                    $state.go('gallery');
                    break;
                case '404':
                    $state.go('404');
                    break;
            }



        }

    }
})();
