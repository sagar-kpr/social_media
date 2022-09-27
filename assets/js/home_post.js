{

    let createPostForm = function(){
        let postForm = $('#post-form');

        postForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : '/post/create',
                data : postForm.serialize(),
                success : function(data){  
                    
                    let newpost = createPostDom(data.data.post, data.data.user);
                    console.log('***',newpost); 
                    notySuccess('Status Posted Successfully.');
                    $('#post-box').prepend(newpost); 
                    deletePost($(' .del-btn', newpost));
                },
                error : function(error){
                    console.log(error.responseText);
                }    


            });
        });
           
    }    

    
    //NOTY FOR SUCCESS
    let notySuccess = function(text){
        new Noty({
            theme: 'semanticui',
            text : text,
            type: 'success',
            timeout : 800,
            layout : 'topRight'
        }).show();
    }

    //NOTY FOR DELETE

    let notyDeleted = function(text){
        new Noty({
            theme: 'semanticui',
            text: text,
            type: 'error',
            timeout:800,
            layout: 'topRight'
        }).show();
    }

   

    let createPostDom = function(post , user){
        return $(`<div class="posts" id="posts-${post._id}">
        <div id="name-and-del-box">
            <div id="profile-name">
                <div id="profile">
                    <img  src="${user.avatar}" alt="${user.first}">
                </div>
                <div id="name">
                    <h1>${user.first} ${user.last}</h1>
                </div>
                
            </div>
            <div id="cross"><span><a class="del-btn" href="/post/destroy/${post._id}">x</a></span></div>
        </div>
        <div id="post-content">
            <p> ${post.content}</p>
        </div>
        <div id="comment-box">
            <div class="comment-scroller" id="comment-scroller-${post._id}"></div>
            <form action="/comment/create/${post.id}" class="comment-form" method="post">
                <textarea type="text" name="content" placeholder="Write a comment..." required cols="40" rows="1"></textarea>
                <input type="hidden" name="post" value="${post._id}"> 
                <input type="submit" value="Comment" id="comment-btn">
            </form>
        </div>
        <div id="like-box">
            <form action="/post/likes/${post.id}" method="post">
                <button type="submit"><i class="fa-regular fa-thumbs-up"></i></button>
                <span id="count"></span>
            </form>
        </div>
    </div>`);
    }

    

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#posts-${data.data.post_id}`).remove();
                    notyDeleted('Post Deleted!')
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }



    createPostForm();


    /*let commentForm = function(){
        let comments = $(' .comment-form');
        comments.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/create/<%=post._id%>',
                data: comments.serialize(),
                success: function(data) {
                    //console.log('cmnt data',data);
                    let newComment = createCommentDom(data.data.comment, data.data.user );
                    $(`#comment-scroller-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .del-cmnt', newComment));
                    notySuccess('Comment Posted Successfully!');
                },
                error : function(err){
                    console.log('12345',err.responseText);
                }
            });
        });
    }*/

    /* let createCommentDom = function(comment,user){
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
    }*/


    /*let deleteComment = function(commentLink){
        $(commentLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url : $(commentLink).prop('href'),
                success: function(data){
                   $(`#comment-${data.data.comment_id}`).remove();
                   notyDeleted('Comment Deleted!');

                },error : function(err){
                    console.log(err.responseText);
                }
            })
        })

    }*/

    /*let convertPostsToAjax = function() {
        $('#post-box').each(function() {
            let self = $(this);
            let deleteButton = $(' .del-btn', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }*/

   
   

}