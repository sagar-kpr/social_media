const messenger = document.getElementById('messenger');
var j = 0 ;

const frndsbox = document.querySelectorAll(' .friends')


messenger.addEventListener('click', function(){
    if(j % 2 == 0){
        document.getElementById('msg-box').style.display = 'block';
    }else{
        document.getElementById('msg-box').style.display = 'none';
    }
    j++;
})


frndsbox[0].addEventListener('click', function(){
    console.log('sdsdsds', frndsbox[0])
    document.getElementById('chat-box').style.display = 'block';
})

/*<% if(locals.user.friends.length > 0) { %>
                        <% for(frnds of locals.user.friends){ %>
                            <% for(list of users){ %>
                                <% if(frnds == list.id) { %>
                                    <div class="friends" id="user-<%=list._id %>">
                                        <div id="friends-img-box">
                                            <div id="friends-img">
                                                <img src="<%= list.avatar %>"  alt="">
                                            </div>
                                            <div id="friends-name">
                                                <p><%=list.first + ' ' + list.last %></p>
                                            </div>
                                        </div>
                                    </div>
                                <% } %>   
                            <% } %>
                        <% } %>
                    <% } else { %>
                        <h3 style="text-align:center ; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">No Freinds...</h3>
                    <% }  %> */
