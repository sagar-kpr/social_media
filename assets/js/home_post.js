{
    //CREATE POST-FORM AND COMMENT-FORM
    let createPostForm = function(){
        let postForm = $('#post-form');
        postForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : '/post/create',
                data : postForm.serialize(),
                success : function(data){
                    let newpost = createPostDom(data.data.post , data.data.user);
                    $('#post-box').prepend(newpost);
                    createCommentForm($(' .comment-form',newpost));
                    deletePost($(' .del-btn',newpost));
                    notySuccess('Status Post Successfully');

                },
                error : function(data){
                    console.log(data);
                }
            });
        });
    }

    let createCommentForm = function(comment){
        $(comment).submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : '/comment/create',
                data: comment.serialize(),
                success: function(data){
                    console.log('coment',data);
                    let newComment = createCommentDom(data.data.comment, data.data.user);
                    $(`#comment-scroller-${data.data.comment.post}`).prepend(newComment);
                    notySuccess('Comment Posted Successfully');
                    deleteComment($(' .del-cmnt', newComment));

                },error: function(err){
                    console.log(err);
                }

            })
        });
    }

    //NOTY IMPLEMENTATION
    let notySuccess = function(text){
        new Noty({
            theme : 'relax',
            text : text,
            type: 'success',
            timeout: 800,
            layout: 'topRight'
        }).show();
    } 

    let notyDeleted = function(text){
        new Noty({
            theme : 'relax',
            text : text,
            type: 'error',
            timeout: 800,
            layout: 'topRight'
        }).show();
    } 

    //CREATE DOMS FOR POST AND COMMENT
    let createPostDom = function(post , user){
        return $(`<div class="posts" id="posts-${post._id}">
        <div id="name-and-del-box">
            <div>
                <h1>${user.first} ${user.last} <small>posted a status </small></h1>
            </div>
            
                <div><span><a class="del-btn" href="/post/destroy/${post._id}">x</a></span></div>
            
            
        </div>
        <div id="post-content">
            <p> ${post.content}</p>
        </div>
        <div id="comment-box">
            <div id="comment-scroller">
            </div>
           
            <form action="/comment/create" class="comment-form" method="post">
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

    let createCommentDom = function(comment,user){
        return $(`<div class="comment" id="comment-${comment._id}">
        <div id="inner-comment">
            <div id="comment-and-del-box">
                <div>
                    <h3>${user.first} ${user.last}</h3>
                </div>
                    <div><span><a class="del-cmnt" href="/comment/destroy/${comment._id}">x</a></span></div>
            </div>
            <p>${comment.content}</p>
        </div>
    </div>`);
    }

    //DELETE POSTS AND COMMENTS
    let deletePost  = function(delLink){
        $(delLink).click(function(e){
            e.preventDefault();
            console.log('dellink', delLink);
            $.ajax({
                type:'get',
                url : $(delLink).prop('href'),
                success: function(data){
                   $(`#posts-${data.data.postId}`).remove();
                   notyDeleted('Post Deleted');
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    let deleteComment = function(commentLink){
        $(commentLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(commentLink).prop('href'),
                success: function(data){
                    console.log(data)
                

                },error: function(err){
                    console.log(err);
                }

            })
        })

    }
    createPostForm();
}
