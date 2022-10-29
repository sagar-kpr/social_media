const messenger = document.getElementById('messenger');
var j = 0 ;



/*var mini = document.getElementById('minimize');
var m = 0;

var cross = document.getElementById('cross');
var l= 0;*/

messenger.addEventListener('click', function(){
    if(j % 2 == 0){
        document.getElementById('msg-box').style.display = 'block';
    }else{
        document.getElementById('msg-box').style.display = 'none';
    }
    j++;
})





/*cross.addEventListener('click', function(){
    if(l % 2 == 0){
        document.getElementById('chat-box').style.display = 'none';
    }
    
})

mini.addEventListener('click', function(){
    if(m % 2 == 0){
        console.log('hi')
        document.getElementById('chat-box').style.height = '15px';
        document.getElementById('chat-container').style.overflow = 'hidden';
    }
    else{
        document.getElementById('chat-box').style.height = '380px';
    }
    m++;

})*/

