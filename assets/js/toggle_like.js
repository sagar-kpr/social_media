
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }
    
    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log('*//////', self);
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data){
                console.log('data:', data);
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log('likes count', likesCount);
                if(data.data.deleted == true){
                    likesCount +=1;
                }else{
                    likesCount -=1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(err){
                console.log('err in ajax req',err);
            })
        })
    }
}