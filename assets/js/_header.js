const messenger = document.getElementById('messenger');
var j = 0 ;

const frndsbox = document.querySelectorAll(' .friends')


messenger.addEventListener('click', function(){
    if(j % 2 == 0){
        document.getElementById('msg-box').style.display = 'block';
    }else{
        document.getElementById('msg-box').style.display = 'none';
    }
    j++;
})


frndsbox[0].addEventListener('click', function(){
    console.log('sdsdsds', frndsbox[0])
    document.getElementById('chat-box').style.display = 'block';
})


