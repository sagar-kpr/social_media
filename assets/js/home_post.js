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
                    console.log('ppp',newpost);
                    notySuccess('Status Posted Successfully.');
                    $('#post-box').prepend(newpost); 
                    deletePost($(' .del-btn', newpost));
                    $('#textarea').val('');
                    new postComments(data.data.post._id);       
                    new ToggleLike($(' .toggle-like', newpost));            
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
                    <strong>${user.first} ${user.last}</strong>
                </div>
                
            </div>
            <div id="cross"><span><a class="del-btn" href="/post/destroy/${post._id}">x</a></span></div>
        </div>
        <div id="post-content">
            <p> ${post.content}</p>
        </div>
        <div id="comment-box">
            <div class="comment-scroller" id="comment-scroller-${post._id}"></div>
            <div id="form-controller">
                <div id="form-img">
                    <img src="${user.avatar}" >
                </div>
                <div id="form-text">
                    <form action="/comment/create" id="comment-form-${post._id}" method="post">
                        <textarea type="text" id="cmntArea" name="content" placeholder="Write a comment..." required cols="40" rows="1"></textarea>
                        <input type="hidden" name="post" value="${post._id}"> 
                        <input type="submit" value="Comment" id="comment-btn">
                    </form>
                </div>
            
            </div>
        </div>
        <hr>
        <div id="post-like">
            <span >
                <a class="toggle-like" id="like" href="likes/toggle/?id=${post._id}&type=Post"   data-likes= "0">
                    0 Likes
                </a>
            </span>
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
    
    let convertPostToAjax = function(){
        
        $('#post-box > div').each(function(){
            deletePost($(' .del-btn', $(this)));
            let postID = $(this).prop('id').split('-')[1];
            //new ToggleLike($('#like',$(this)));
            new postComments(postID);  
        });
        
    }


    createPostForm();
    convertPostToAjax();
    

}