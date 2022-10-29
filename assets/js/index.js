
var arrow1 = document.getElementById('arrow1');
var k = 0;

var arrow2 = document.getElementById('arrow2');
var i = 0;

var minimize = document.getElementById('minimize');
var j = 0 ;

var chatbox = document.getElementById('chat-box');

minimize.addEventListener('click', function(){
    if(j % 2 == 0){
        console.log('minimize')
        chatbox.style.display = '40px'
    }else{
        chatbox.style.display = '430px'
    }
    j++;
})



arrow1.addEventListener('click', function(){
    if(k % 2 == 0){
        document.getElementsByTagName('li')[6].style.visibility = "hidden";
        document.getElementsByTagName('li')[6].style.position = "absolute";
        document.getElementById('hidden-container').style.display = "block";
    }
    k++;
});


arrow2.addEventListener('click', function(){
    if(i % 2 == 0){
        document.getElementsByTagName('li')[6].style.visibility = "visible";
        document.getElementById('hidden-container').style.display = "none";
    }
    i++;
});



