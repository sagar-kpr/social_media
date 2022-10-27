
class ToggleAdd{
    constructor(ele){
        this.users = ele
        this.toggler = $(this.users)[0].lastElementChild.children
        this.add(this.users)

    }
    add(frnds){
        $(this.toggler).click(function(e){
            e.preventDefault();
            console.log('***',$(users))
            let self = this;
            $.ajax({
                type:'post',
                url: $(self).attr('href'),
                success: function(data){
                users.remove();
                let otherUser = data.data.otherUser
                frnds.remove();
                $('#friends-logo').prepend($(`<div class="friends" id="user-${otherUser._id}")
                    <div id="friends-img-box">
                        <div id="friends-img">
                            <img src="${otherUser.avatar}"  alt="">
                            <div id="status"></div>
                        </div>
                        <p><a href="/home/profile/${otherUser._id}">${otherUser.first}  ${otherUser.last}</a></p>
                    </div>
                    <div id="add-box">
                        <a class="toggle-remove" style="background-color:rgb(185, 36, 36) ;" href="/remove/remove_toggle/?id=${otherUser._id}>">
                            <span>Remove</span>
                        </a>
                    </div>
                </div>
                `))
                }
                ,
                error(err){
                    console.log('err:::',err);
                }
            });
        });
    }

}