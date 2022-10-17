module.exports.chatserver = function(chatServer){
    let io = require('socket.io')(chatServer, {
        cors: {
            origin: 'http://localhost:8000'
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('connection recieved', socket.id)

        socket.on('disconnect', function(){
            console.log('connection disconnect')
        })
    })
}