class postComments{constructor(e){this.postId=e,this.postContainer=$(`#posts-${e}`),this.commentForm=$(`#comment-form-${e}`),this.createComment(e);let n=this;$(" .del-cmnt",this.postContainer).each((function(){n.deleteComment($(this))}))}createComment(e){let n=this;this.commentForm.submit((function(t){t.preventDefault();$.ajax({type:"post",url:"/comment/create",data:$(this).serialize(),success:function(t){let o=n.newCommentDom(t.data.comment,t.data.user);$(`#comment-scroller-${t.data.comment.post}`,this.postContainer).prepend(o),n.deleteComment($(" .del-cmnt",o)),new ToggleLike($(" .toggle-like",o)),$(`#comment-form-${e} > #cmntArea`).val("")},error:function(e){console.log("err while creating cmnt",e.responseText)}})}))}newCommentDom(e,n){return $(`<div class="comment" id="comment-${e._id}">\n            <div id="cmntAndImg">\n                <div id="cmnt-img">\n                    <img src="${n.avatar}" alt="${n.first}">\n                </div>\n                <div id="inner-comment">\n                    <div id="comment-and-del-box">\n                        <div>\n                            <h3> ${n.first} ${n.last}</h3>\n                        </div>\n                    \n                            <div><span><a class="del-cmnt" href="/comment/destroy/${e._id}">x</a></span></div>\n                    \n                    </div>\n                    <p>${e.content} </p>\n                </div>\n            </div>\n            <div class="cmnt-like">\n                <div id="like-logo-count">\n                    <a class="toggle-like" id="like" href="likes/toggle/?id=${e._id}&type=Comment"  >\n                        <i class="like-color"></i>\n                    </a>\n                    <div id="count" data-likes= "0">\n                        <span >&nbsp; 0</span>\n                    </div>\n                </div>\n            </div>    \n        </div> `)}deleteComment(e){$(e).click((function(n){n.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log("yyyy",e),$(`#comment-${e.data.comment_id}`).remove()},error:function(e){console.log("err in deleting",e.responseText)}})}))}}