class ToggleRemove{
    constructor(ele){
        this.friends = ele
        this.toggler = $(this.users)[0].lastElementChild.children
        console.log('2323',this.toggler)
        this.add(this.friends)
    }

    add(friends){
        $(this.toggler).click(function(e){
            e.preventDefault();
            console.log('000',this.toggler);
            /*let self = this;
            console.log(self);
            $.ajax({
                type:'post',
                url: $(self).attr('href'),
                success: function(data){
                friends.remove();
                let otherUser = data.data.otherUser
                $('#totalusers').prepend($(`<div class="users" id="user-${otherUser._id}">
                    <div id="users-img-box">
                        <div id="users-img">
                            <img src="${otherUser.avatar}"  alt="">
                            <div id="status"></div>
                        </div>
                        <p><a href="/home/profile/${otherUser._id}">${otherUser.first}  ${otherUser.last}</a></p>
                    </div>
                    <div id="add-box">
                        <a class="toggle-add" style="background-color:rgb(185, 36, 36) ;" href="#">
                            <span>Add</span>
                        </a>
                    </div>
                </div>
                `))
                }
                ,
                error(err){
                    console.log('err:::',err);
                }
            });*/
        });
    }

}