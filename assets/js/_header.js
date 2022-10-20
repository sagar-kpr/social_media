const messenger = document.getElementById('messenger');
var j = 0 ;

const frndsbox = document.getElementById('friends-img-box');


messenger.addEventListener('click', function(){
    if(j % 2 == 0){
        document.getElementById('msg-box').style.display = 'block';
    }else{
        document.getElementById('msg-box').style.display = 'none';
    }
    j++;
})


frndsbox.addEventListener('click', function(){
    document.getElementById('chat-box').style.display = 'block';
})


