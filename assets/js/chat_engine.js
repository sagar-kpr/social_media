class ChatEngine{
    constructor(id,email){
        this.chatbox = id
        this.user = email
         
        this.socket = io.connect('http://localhost:5000')

        if(this.user){
            clientSide()
        }
    }

    clientSide(){
        this.socket.on('connect', function(){
            console.log('conetion establish')
        })
    }
}