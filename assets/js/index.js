
var arrow1 = document.getElementById('arrow1');
var k = 0;

var arrow2 = document.getElementById('arrow2');
var i = 0;

<<<<<<< HEAD
/*var mini = document.getElementById('minimize');
var m = 0;

var cross = document.getElementById('cross');
var l= 0;*/
=======

>>>>>>> d71c97b56139069c54ba6dbbee53bdb9e3a8e34d

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

<<<<<<< HEAD
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
=======

>>>>>>> d71c97b56139069c54ba6dbbee53bdb9e3a8e34d

