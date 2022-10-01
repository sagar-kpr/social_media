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
                    console.log('ppp',);
                    notySuccess('Status Posted Successfully.');
                    $('#post-box').prepend(newpost); 
                    deletePost($(' .del-btn', newpost));
                    $('#textarea').val('');
                    new postComments(data.data.post._id);
                    

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
            <form action="/comment/create" id="comment-form-${post._id}" method="post">
                <textarea type="text" id="cmntArea" name="content" placeholder="Write a comment..." required cols="40" rows="1"></textarea>
                <input type="hidden" name="post" value="${post._id}"> 
                <input type="submit" value="Comment" id="comment-btn">
            </form>
        </div>
        <hr>
        <div id="like-box">
            <span ><a href="/post/like/${post._id}" id="like"><i class="fa-regular fa-thumbs-up"></i></a></span>
            <span id="count"></span>
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
            new postComments(postID);
        });
    }

    createPostForm();
    convertPostToAjax();
    

}