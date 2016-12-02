(function () {
    'use strict';

    app.controller('ContactCtrl', ContactCtrl);

    function ContactCtrl(api, $timeout) {
        var contactVm = this;
        contactVm.newUser = null;

        //for alert box when email is sent
        contactVm.showAlert = false;
        contactVm.sendEmail = sendEmail;
        contactVm.clearForm = clearForm;


        // Send Email
        // params - User newUser
        // send post request to server side to send email
        function sendEmail(newUser) {
            var payload = null;

            // check everything has values

                // create an obj to post
                payload = {
                        name: newUser.contactName,
                        email: newUser.contactEmail,
                        message: newUser.contactMessage
                    }
                    // send request
                api.request('/sendEmail', payload, 'POST')
                    .then(function (res) {
                        if (res.data.err == null) {
                            console.log(res.data.msg);
                            contactVm.alertClass = "alert-success";
                            contactVm.emailMessage = res.data.msg;
                        } else {
                            console.log(res.data.msg);
                            contactVm.alertClass = "alert-danger";
                            contactVm.emailMessage = res.data.msg + " - " + res.data.err.message;
                        }

                        // change value to show the alert
                        contactVm.showAlert = true;
                        // timeout function to change it back
                        $timeout(function(){
                            contactVm.showAlert = false;
                        }, 5000);
                        // clear it cause we don't want a mess
                        contactVm.clearForm();
                    });
        }
        function clearForm() {
            contactVm.newUser.contactName = "";
            contactVm.newUser.contactEmail = "";
            contactVm.newUser.contactSubject = "";
            contactVm.newUser.contactMessage = "";
        }

    }
})();
