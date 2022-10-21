
class ToggleAdd{
    constructor(ele){
        this.frnds = ele
        this.toggler = $(this.frnds)[0].lastElementChild.children
        this.add(this.frnds)
    }

    add(frnds){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'))
            $.ajax({
                type:'post',
                url: $(self).attr('href'),
                success: function(data){
                let otherUser = data.data.otherUser
                frnds.remove();
                $('#friends-logo').prepend($(`<div class="friends" id="user-${otherUser._id}">
                    <div id="friends-img-box">
                        <div id="friends-img">
                            <img src="${otherUser.avatar}"  alt="">
                            <div id="status"></div>
                        </div>
                        <p><a href="/home/profile/${otherUser._id}">${otherUser.first}  ${otherUser.last}</a></p>
                    </div>
                    <div id="add-box">
                        <a class="toggle-add" style="background-color:rgb(185, 36, 36) ;" href="#">
                            <span>Remove</span>
                        </a>
                    </div>
                </div>
                `))
                 
                },
                error(err){
                    console.log('err:::',err);
                }
            });
        });
    }

    /*createDom(localUser,otherUser){
        console.log('/*//*',localUser,otherUser)
        
    }*/

}