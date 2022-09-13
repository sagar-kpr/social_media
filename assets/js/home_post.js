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
                    console.log(data);
                    let newpost = createPostDom(data.data.post , data.data.user);
                    $('#post-box').prepend(newpost);
                },
                error : function(data){
                    console.log(data);
                }
            });
        });
    }

    let createPostDom = function(post , user){
        return $(`<div class="posts" id="posts-${post.id} %>">
        <div id="name-and-del-box">
            <div>
                <h1>${user.first} ${user.last} <small>posted a status </small></h1>
            </div>
            
                <div><span><a clss="del-btn" href="/post/destroy/${post.id}">x</a></span></div>
            
            
        </div>
        <div id="post-content">
            <p> ${post.content}</p>
        </div>
        <div id="comment-box">
            <div id="comment-scroller">
            </div>
           
                <form action="/comment/create" method="post">
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

    createPostForm();
}
