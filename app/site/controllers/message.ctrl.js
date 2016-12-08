(function() {
    'use strict';
    app.controller('MessageCtrl', MessageCtrl);

    function MessageCtrl(api) {
        var messageVm = this;
        messageVm.comments;
        messageVm.getComments = getComments();
        messageVm.addComment = addComment;
        messageVm.deleteComment = deleteComment;
        messageVm.addReply = addReply;

        function getComments() {
            api.request('/comments/',{},'GET')
            .then(function(res,err){
                if(err){
                    console.log(err);
                }else{
                    messageVm.comments = res.data
                    return res.data;
                }
            })
         }
        function addComment(){
        }
        function deleteComment(){

        }
        function addReply(comment){

        }
    }

})();
