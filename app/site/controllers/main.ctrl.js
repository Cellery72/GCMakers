(function () {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state, api, $timeout) {
        var mainVm = this;
        mainVm.meetingInfo = "";
        mainVm.meetingDate = "September 6th";
        mainVm.meetingTime = "6:00PM";
        mainVm.meetingRoom = "E212";
        mainVm.newUser = null;

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
                .then(function (res) {
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

        // Send Email 
        // params - User newUser
        // send post request to server side to send email 
        function sendEmail(newUser) {
            var payload = null;

            // check everything has values
            if (newUser.contactName != undefined && newUser.contactEmail != undefined && newUser.contactMessage != undefined && newUser.contactSubject != undefined) {
                // create an obj to post
                payload = {
                        name: newUser.contactName,
                        email: newUser.contactEmail,
                        subject: newUser.contactSubject,
                        message: newUser.contactMessage
                    }
                    // send request
                api.request('/sendEmail', payload, 'POST')
                    .then(function (res) {
                        if (res.data.err == null) {
                            console.log(res.data.msg);
                            mainVm.alertClass = "alert-success";
                            mainVm.emailMessage = res.data.msg;
                        } else {
                            console.log(res.data.msg);
                            mainVm.alertClass = "alert-danger";
                            mainVm.emailMessage = res.data.msg + " - " + res.data.err.message;
                        }

                        // change value to show the alert
                        mainVm.showAlert = true;
                        // timeout function to change it back
                        $timeout(function(){
                            mainVm.showAlert = false;
                        }, 5000);
                        // clear it cause we don't want a mess
                        mainVm.clearForm();
                    });
            }
        }

        function clearForm() {
            mainVm.newUser.contactName = "";
            mainVm.newUser.contactEmail = "";
            mainVm.newUser.contactSubject = "";
            mainVm.newUser.contactMessage = "";
        }
    }
})();