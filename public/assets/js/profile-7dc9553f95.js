var btn1=document.getElementById("edit-btn1"),edit1=document.getElementById("edit1"),btn2=document.getElementById("edit-btn2"),edit2=document.getElementById("edit2"),i=0,j=0;btn1.addEventListener("click",(function(){edit1.style.display=i%2==0?"block":"none",i++})),btn2.addEventListener("click",(function(){edit2.style.display=j%2==0?"block":"none",j++}));var status=window.navigator.onLine;function online(){document.getElementById("status").style.backgroundColor="green",document.getElementById("status").style.border="2px solid white"}function ofline(){document.getElementById("status").style.backgroundColor="red",document.getElementById("status").style.border="2px solid white"}status?online():ofline();