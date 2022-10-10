
class postComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#posts-${postId}`);
        this.commentForm = $(`#comment-form-${postId}`);

        this.createComment(postId);
        let self = this;
        $(' .del-cmnt', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let postSelf = this; //refereing to postcomment class
        this.commentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            
            $.ajax({
                type: 'post',
                url :'/comment/create',
                data : $(self).serialize(),
                success :function(data){
                    let newComment= postSelf.newCommentDom(data.data.comment, data.data.user);
                    $(`#comment-scroller-${data.data.comment.post}`,this.postContainer).prepend(newComment);
                    postSelf.deleteComment($(' .del-cmnt',newComment));
                    $(`#comment-form-${postId} > #cmntArea`).val('');
                    
                },error : function(err){
                    console.log('err while creating cmnt', err.responseText);
                }
            });
        });
    }

    newCommentDom(comment,user){
        return $(`<div class="comment" id="comment-${comment._id}">
            <div id="cmntAndImg">
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
            </div>
            <div class="cmnt-like">
                <span ><a href="#" ><i class="fa-regular fa-thumbs-up"></i></a></span>
                <span id="count"> 0 </span>
            </div>    
        </div> `);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){

            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log('yyyy',data);
                    $(`#comment-${data.data.comment_id}`).remove();
                },error : function(err){
                    console.log('err in deleting', err.responseText);
                }
            });

        });
    }

}


    




