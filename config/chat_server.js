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

        socket.on('join_room',function(data){
            socket.join(data.chatRoom)
            io.in(data.chatRoom).emit('user_join', data)
        });

        socket.on('send_msg', function(data){
            io.in(data.chatRoom).emit('recived_msg', data);

        })

    })

}