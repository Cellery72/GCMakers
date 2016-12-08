(function() {
    'use strict';
    app.controller('SignupCtrl', SignupCtrl);

    function SignupCtrl(memberSrv) {
        var signupVm = this;

        //initialize functions
        signupVm.addMember = addMember;
        signupVm.isValidMail = isValidMail;

        function isValidMail(str) {
            var mailPattern = /^[a-zA-Z0-9._-]+@mygeorgian.ca$/;
            var mailPattern2 = /^[a-zA-Z0-9._-]+@student.georgianc.on.ca$/;
            var mailPattern3 = /^[a-zA-Z0-9._-]+@georgiancollege.ca$/;

            return mailPattern.test(str) || mailPattern2.test(str) || mailPattern3.test(str);
        }
        
        function addMember(member){
            memberSrv.addMember(member);
        }

    }

})();
