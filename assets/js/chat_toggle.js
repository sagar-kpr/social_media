

class ChatToggle{
    constructor(ele){
        this.user = ele
        this.toggler = $(this.user)[0].children[0];
        this.create(this.user)
    }

    create(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log('href::',$(self).attr('href'))
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
                success: function(data){
                    let user = data.data.user
                    let local = data.data.local
                    console.log('user found', local)
                    let newMsg =  $(`<div id="chat-box">
                    <div id="chat-header">
                        <div id="user-box">
                            <div id="user-img">
                                <img src="${user.avatar}">
                            </div>
                            <div id="user-name">
                                <p>${user.first} ${user.last}</p>
                            </div>
                        </div>
                        <div id="cross-box">
                            <div id="minimize">
                                <i class="fa-sharp fa-solid fa-minus"></i>
                            </div>
                            <div id="close">
                                <i class="fa-sharp fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    <ul id="chat-container">
                        <li class="other-msg">
                        </li>
                        <li class="self-msg">
                        </li>
                    </ul>
                    <div id="inp-container">
                        <input placeholder="Type here..." id="inp">
                        <div id="send"><i id="btn" class="fa-solid fa-paper-plane"></i></div>
                    </div>
                </div>`)
                let script = $(` <script>
                    new ChatEngine('chat-box', '${local}');
                </script>`)    
                $('#main').append(newMsg)
                $('#main').append(script)
                },
                error: function(err){
                    console.log('err in chat box', err)
                }
            })
        })
    }
}