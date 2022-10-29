var chat_box = document.getElementById('chat-box')



var close = document.getElementById('close');
close.addEventListener('click', function(){
    chat_box.style.display = 'none'
    
})


var mini = document.getElementById('minimize');
var j = 0;
mini.addEventListener('click', check);

function check(){
    if(j % 2 == 0){
        console.log('frst',j % 2 == 0)
        chat_box.style.height = '40px'
    }else{
        console.log('scnd',j % 2 == 0)
        chat_box.style.height = '430px'
    }
    j++;
}



