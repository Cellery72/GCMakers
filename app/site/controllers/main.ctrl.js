(function () {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state, api, $timeout, img) {
        var mainVm = this;
        mainVm.$state = $state;
        mainVm.images = [];
        mainVm.newUser = null;
        mainVm.sliderIndex = 0;

        //for alert box when email is sent
        mainVm.showAlert = false;

        mainVm.load = load();
        mainVm.getImages = getImages();
        mainVm.slider = setInterval(slider,5000);

        mainVm.sendEmail = sendEmail;
        mainVm.clearForm = clearForm;

        function load() {
            $('.main-slider').addClass('animate-in');
            $('.preloader').remove();

        }

        function getImages() {

            mainVm.images = img.resolveImages().slice(0,6);
        }

        function slider() {


            if(mainVm.sliderIndex == 5){
                mainVm.sliderIndex = 0;
            }else{
                mainVm.sliderIndex++;

            }
            $('.slider-img').fadeOut("slow",function(){
                $('.slider-img').attr("src", mainVm.images[mainVm.sliderIndex].src);

            });

                $('.slider-img').fadeIn("slow", function(){
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
