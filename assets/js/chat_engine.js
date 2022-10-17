class ChatEngine{
    constructor(chatbox, email){
        this.chatbox = $(`#${chatbox}`)
        this.userEmail = email
        this.socket = io.connect('http://localhost:5000');
        this.socketHandler()
    }

    socketHandler(){
        this.socket.on('connect', function(){
            console.log('connection establish')
        });

    }
}