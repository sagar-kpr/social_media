const messenger = document.getElementById('messenger');
var j = 0 ;

const frndsbox = document.querySelectorAll(' .friends')

var minimize = document.getElementById('minimize');
var i = 0 ;


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

minimize.addEventListener('click', function(){
    if(i % 2 == 0){
        document.getElementById('chat-box').style.height = '30px'
    }else{
        document.getElementById('chat-box').style.height = '380px';
    }
    i++;
    
})

