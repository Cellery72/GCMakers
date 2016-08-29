(function() {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state, api) {
        var mainVm = this;
        mainVm.meetingInfo = "";
        mainVm.meetingDate = "September 6th";
        mainVm.meetingTime = "6:00PM";
        mainVm.meetingRoom = "E212";

        //for alert box when email is sent
        mainVm.showAlert = false;

        mainVm.state = $state;
        mainVm.load = load;
        mainVm.go = go;
        mainVm.sendEmail = sendEmail;
        mainVm.clearForm = clearForm;

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
                case 'gallery':
                    $state.go('gallery');
                    break;
                case 'panel':
                    $state.go('panel');
                    break;
                case '404':
                    $state.go('404');
                    break;
            }
        }

        function load() {
            $('.main-slider').addClass('animate-in');
            $('.preloader').remove();

            //update meeting time to most upcoming
            api.request('/upcomingMeeting', '', 'GET')
                .then(function(res) {
                    if (res.data.msg == null) {
                        console.log(res.data.msg);
                    } else {
                        if (res.data.meeting.length > 0) {
                            var date = new Date(Date.parse(res.data.meeting[0].date));
                            mainVm.meetingDate = date.toDateString();
                            mainVm.meetingTime = date.toLocaleTimeString(navigator.language, {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            mainVm.meetingInfo = "Next Meeting: " + mainVm.meetingDate + ' | ' + mainVm.meetingTime + ' | ' + mainVm.meetingRoom;
                        }
                    }
                });
        }

        function sendEmail(name, email, message) {
            var payload = {
                name: name,
                email: email,
                message: message
            }
            api.request('/sendEmail', payload, 'POST')
                .then(function(res) {
                    if (res.data.user == null) {
                        console.log(res.data.msg);
                        mainVm.alertClass = "alert-danger";

                        mainVm.emailMessage = res.data.msg + " - Please review your information and try again.";


                    } else {
                        console.log(res.data.msg);
                        mainVm.alertClass = "alert-success";

                        mainVm.emailMessage = res.data.msg + " from " +
                            res.data.user.email;

                    }
                    mainVm.showAlert = true;


                    mainVm.clearForm();
                })
        }

        function clearForm() {
            mainVm.contactName = "";
            mainVm.contactEmail = "";
            mainVm.contactMessage = "";
        }
    }
})();
