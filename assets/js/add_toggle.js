class ToggleAdd{
    constructor(ele){
        this.frnds = ele
        this.toggler = $(this.frnds)[0].lastElementChild.children
        this.add()
    }

    add(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'))
            $.ajax({
                type:'post',
                url: $(self).attr('href'),
                success(data){
                    console.log(data);
                },
                error(err){
                    console.log('err:::',err);
                }
            });
        });
    }

}