var btn = document.getElementById('edit-btn');
var edit = document.getElementById('edit');
var i = 0;

btn.addEventListener('click', function(){
    if(i % 2 == 0){
        edit.style.display = "block";
        

    }else{
        edit.style.display = "none";

    }
    i++;
});