
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
                    $(div).attr('data-likes', likesCount);
                    $(self).html(`<i class="like-color" style="background-position: 0px -251px;"></i>  `);
                    $(div).html(`&nbsp; ${likesCount}`)
                }else{
                    likesCount +=1;
                    $(div).attr('data-likes', likesCount);
                    $(self).html(`<i class="blu-color " style="background-position: 0px -232px;" ></i>  `);
                    $(div).html(`&nbsp; ${likesCount}`)
                }

                // $(div).attr('data-likes', likesCount);
                // $(self).html(`<i class="like-color"></i>  `);
                // $(div).html(`&nbsp; ${likesCount}`)
            })
            .fail(function(err){ 
                console.log('errrrrr in ajax req',err);
            })
        })
    }
}