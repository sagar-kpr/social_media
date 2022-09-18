/*{
    let createCommentForm = function(){
        let commentForm = $('#comment-form');
        commentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/comment/create',
                data : commentForm.serialize(),
                success : function(data){
                    console.log('////',data);

                },
                error : function(err){
                    //console.log('----',err.responseText);
                }
            });


        });
    }
    createCommentForm();
}*/