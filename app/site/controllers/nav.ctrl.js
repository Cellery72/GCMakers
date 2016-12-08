(function () {
    'use strict';

    app.controller('NavCtrl', NavCtrl);

    function NavCtrl($state, img, api) {
        var navVm = this;
        navVm.meetingRoom = "E212";
        navVm.meetingInfo = "Next Meeting: There are currently no meetings scheduled"

        navVm.go = go;
        navVm.getMeeting = getMeeting();

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
                case 'signup':
                    $state.go('signup');
                    break;
                case 'admin':
                      $state.go('admin');
                      break;
                case '404':
                    $state.go('404');
                    break;
            }

        }

        function getMeeting() {
            //update meeting time to most upcoming
            api.request('/upcomingMeeting', '', 'GET')
                .then(function(res) {

                    if (res.data.msg == null) {
                        console.log(res.data.msg);
                    } else {
                        if (res.data.meeting.length > 0) {
                            var date = new Date(Date.parse(res.data.meeting[0].date));
                            navVm.meetingDate = date.toDateString();
                            navVm.meetingTime = date.toLocaleTimeString(navigator.language, {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            navVm.meetingInfo = "Next Meeting: " + navVm.meetingDate + ' | ' + navVm.meetingTime + ' | ' + navVm.meetingRoom;
                        }
                    }
                });
        }

    }
})();
