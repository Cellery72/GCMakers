(function () {
    'use strict';

    app.service('member', MemberService);

    function MemberService($state, api) {
        var self = this;
        self.Members = [];
        //functions
        self.getMembers = getMembers;
        self.updateMember = updateMember;
        self.deleteMember = deleteMember;

        function addMember

        function getMembers(){
            api.request('/Members',{},'GET')
            .then(function(res,err){
                if(err){
                    console.log(err);
                }else{
                    self.Members = res.data;
                    return res.data;
            }
            })
        }

        function deleteMember(_id){
            api.request('/Members/'+_id, {}, 'DEL')
               .then(function(res,err){
                   if(err){
                       console.log(err);
                   }else{
                       console.log(res.data.msg);
                   }
               });
        }
    };
})();
