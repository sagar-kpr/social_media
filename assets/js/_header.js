const messenger = document.getElementById('messenger');

var minimize = document.getElementById('minimize');
var i = 0 ;


messenger.addEventListener('click', function(){
    if(i % 2 == 0){
        document.getElementById('msg-box').style.display = 'block';
    }
    else{
        document.getElementById('msg-box').style.display = 'none';
    }
    i++;
   
})
