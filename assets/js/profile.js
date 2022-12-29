var btn1 = document.getElementById('edit-timeline');
var edit1 = document.getElementById('edit1');

var btn2 = document.getElementById('camera');
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


/*check if user online 

var status = window.navigator.onLine;

if(status){
    online();
}else{
    ofline();
}


function online(){
    document.getElementById('status').style.backgroundColor = "green";
    document.getElementById('status').style.border= "2px solid white";
}

function ofline(){
    document.getElementById('status').style.backgroundColor = "red";
    document.getElementById('status').style.border= "2px solid white";
}*/