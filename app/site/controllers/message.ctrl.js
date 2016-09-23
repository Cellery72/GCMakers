(function() {
    'use strict';
    app.controller('MessageCtrl', MessageCtrl);

    function MessageCtrl(api,auth) {
        var messageVm = this;
        messageVm.user = auth.resolveUser();
        messageVm.comments;
        messageVm.reply;

        //initialize functions
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

            var newComment = {
                author: messageVm.user,
                message: messageVm.newComment
            }
            api.request('/addComment',newComment,'PUT')
            .then(function(res,err){
                if (err){
                    console.log(err);
                }else{
                    console.log('Comment Added By: ' + res.data.comment.author.firstName)
                }
            })

        }
        function deleteComment(){

        }
        function addReply(message,comment){
            console.log(message);
        }
    }

})();
