
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }
    
    toggleLike(){
        $(this.toggler).click(function(e){

            e.preventDefault();
            let self = this;
            console.log('*//////', $(self).attr('href'));
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let div = $(self)[0].nextElementSibling;
                console.log('div',$(div).attr('data-likes'));
                let likesCount = parseInt($(div).attr('data-likes'));
                console.log('likes count', likesCount);
                if(data.data.deleted == true){
                    likesCount -=1;
                }else{
                    likesCount +=1;
                }

                $(div).attr('data-likes', likesCount);
                $(self).html(`<i style="background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/t43elCio3g1.png'); background-position: 0px -251px; background-size: auto; width: 18px; height: 18px; background-repeat: no-repeat; display: inline-block;"></i>  `);
                $(div).html(`&nbsp; ${likesCount}`)
            })
            .fail(function(err){ 
                console.log('errrrrr in ajax req',err);
            })
        })
    }
}