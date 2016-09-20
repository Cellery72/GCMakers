(function() {
    'use strict';

    app.controller('MainCtrl', MainCtrl);

    function MainCtrl($state) {
        var mainVm = this;
        mainVm.state = $state;
        mainVm.submitForm = submitForm();

        function submitForm(maker) {
          console.log('made it');
          console.log(maker);
        }
    }
})();