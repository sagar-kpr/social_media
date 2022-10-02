
var arrow = document.getElementById('arrow');
var k = 0;


arrow.addEventListener('click', function(){
    if(k % 2 == 0){
        document.getElementById('hidden-container').style.display = "block";
    }else{
        document.getElementById('hidden-container').style.display = "none";
    }
    k++;
});


