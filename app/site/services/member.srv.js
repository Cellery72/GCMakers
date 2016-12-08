(function () {
    'use strict';

    app.service('memberSrv', MemberSrv);

    function MemberSrv($state, api) {
        var self = this;

        self.addMember = addMember;

        function addMember(member) {

         api.request('/member/add', member, 'PUT')
            .then(function(res,err){
                if(err){
                    console.log(err);
                }else{
                    location.reload();
                    window.scrollTo(0,0);
                }
            });
        }
    };
})();
