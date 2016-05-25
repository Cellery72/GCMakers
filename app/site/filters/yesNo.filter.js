(function () {
    'use strict';
    app.filter('yesNo', YesNo);

    function YesNo() {
        return function (input) {
            return input ? 'Yes' : 'No';
        }
    }

})();