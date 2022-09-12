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
                    let postDom = createPostDom(data.data.post);
                    $('#post-box').prepend(postDom); 

                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let createPostDom = function(post){
      
        return $(`<div class="posts" id="posts-${post._id}">
        <div id="name-and-del-box">
           <div>
               <h1>${post.user} ${post.user} <small>posted a status </small></h1>
           </div>
           
               <div><span><a class="del-btn" href="/post/destroy/${post.id}">x</a></span></div>
       </div>
       <div id="post-content">
           <p>${post.content}</p>
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