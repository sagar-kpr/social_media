{

    let createCommentForm = function(){
        let commentForm = $(' .comment-form ');
        commentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/comment/create/<%=post._id%>',
                data:
            })
        });
    }
    createCommentForm();

}