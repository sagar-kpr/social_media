class ChatEngine{
    constructor(chatbox, email){
        this.chatbox = $(`#${chatbox}`)
        this.userEmail = email
        this.socket = io.connect('http://localhost:5000');
        this.socketHandler()
    }

    socketHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection establish')
            self.socket.emit('join_room', {
                userEmail : self.userEmail,
                chatRoom : 'facebook'
            });

            self.socket.on('user_join', function(data){
                console.log('new user joined', data)
            })

        });

        $('#btn').click(function(){
            let msg = $('#inp').val();

            if(msg != ''){
                self.socket.emit('send_msg', {
                    message : msg,
                    id : self.userEmail,
                    chatRoom : 'facebook'
                })
            }
        });  
        
        self.socket.on('recived_msg', function(data){
            let newMsg = $('<li>');
            let msgType = 'other-msg';

            if(data.id == self.userEmail){
                msgType = 'self-msg';
            }

            newMsg.append($('<span>', {
                'html' : data.message
            }))

            newMsg.addClass(msgType);

            $('#chat-container').append(newMsg)

        })

        /*$('#btn').click(function(){
            let msg = $('#inp').val();
            
            if(msg != ''){
                self.socket.emit('send_msg', {
                    message : msg,
                    user_email : self.userEmail,
                    chat_room : 'facebook'
                })
            }
        })

        self.socket.on('recieved_msg', function(data){
            let newMsg = $('<li>');
            let msgType = 'other-msg'

            if(data.user_email == self.userEmail){
                msgType = 'self-msg'
            }

            newMsg.append($('<span>',{
                'html' : data.message
            }));

            newMsg.append($('<small>', {
                'html' : data.user_email
            }));

            newMsg.addClass(msgType)
            $('#chat-container').append(newMsg)

        })*/
    }

}