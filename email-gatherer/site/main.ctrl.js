(function() {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state) {
        var mainVm = this;

        //for alert box when email is sent
        mainVm.showAlert = false;

        mainVm.state = $state;
        mainVm.sendEmail = sendEmail;
        mainVm.clearForm = clearForm;

        function sendEmail(name, email, message) {
            // var payload = {
            //     name: name,
            //     email: email,
            //     message: message
            // }
            // api.request('/sendEmail', payload, 'POST')
            //     .then(function(res) {
            //         if (res.data.user == null) {
            //             console.log(res.data.msg);
            //             mainVm.alertClass = "alert-danger";

            //             mainVm.emailMessage = res.data.msg + " - Please review your information and try again.";


            //         } else {
            //             console.log(res.data.msg);
            //             mainVm.alertClass = "alert-success";

            //             mainVm.emailMessage = res.data.msg + " from " +
            //                 res.data.user.email;

            //         }
            //         mainVm.showAlert = true;


            //         mainVm.clearForm();
            //     })
        }

        function clearForm() {
            mainVm.contactName = "";
            mainVm.contactEmail = "";
            mainVm.contactMessage = "";
        }
    }
})();
