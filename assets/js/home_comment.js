
{
    let create_CommentForm = function(){
        let commentForm = $(' .comment-form');
        
        commentForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'post',
                url: $(this).prop('action'),
                data : $(this).serialize(),
                success: function(data){
                    
                    let post = $(`#posts-${data.data.comment.post}`);
                    let newComment = createCommentDom(data.data.comment, data.data.user);
                    
                    $(`#comment-scroller-${data.data.comment.post}`,post).prepend(newComment);

                }, error: function(err){
                    console.log(err);
                }
                
            })
            
        });

    }

    let createCommentDom = function(comment,user){
        return $(`<div class="comment" id="comment-${comment._id}">
        <div id="cmnt-img">
            <img src="${user.avatar}" alt="${user.first}">
        </div>
        <div id="inner-comment">
            <div id="comment-and-del-box">
                <div>
                    <h3> ${user.first} ${user.last }</h3>
                </div>
               
                    <div><span><a class="del-cmnt" href="/comment/destroy/${comment._id}">x</a></span></div>
               
            </div>
            <p>${comment.content } </p>
        </div>
    </div> `);
    }

    create_CommentForm();
}