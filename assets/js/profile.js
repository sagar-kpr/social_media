var btn1 = document.getElementById('edit-btn1');
var edit1 = document.getElementById('edit1');

var btn2 = document.getElementById('edit-btn2');
var edit2 = document.getElementById('edit2');

var i = 0;
var j = 0;

btn1.addEventListener('click', function(){
    if(i % 2 == 0){
        edit1.style.display = "block";
        

    }else{
        edit1.style.display = "none";

    }
    i++;
});

btn2.addEventListener('click', function(){
    if(j % 2 == 0){
        edit2.style.display = "block";
        

    }else{
        edit2.style.display = "none";

    }
    j++;
});