var json = (function () {
    var json = null;
    $.ajax({
       'async': false,
       'global': false,
       'url': "../json/posts.json",
       'dataType': "json",
       'success': function (data) {
          json = data;
       }
    });
    return json;
 })();

var localStorageAdd = function(){
    localStorage.setItem('Date_Base', JSON.stringify(json));
}
localStorageAdd();

var completePosts = function(){
    var dataTaken = JSON.parse(localStorage.getItem("collection"));
    var post = document.getElementById('posts');
    post.innerHTML = '';
    for( var i = 0; i < dataTaken.length; i++){
          newPost(i);
    }
}

var newPost = function(number){
    var post = document.getElementById('posts');

    var tags = function(num){
        tagButton = '';
        for(var tag = 0; tag < dataTaken[num].tags; tag++){
           tagButton += `<button class="btn btn-xs btn-default">${dataTaken[number].tags[tag]}</button>`;
        }
        return tagButton;
    }
    var button_T = tags(number);
    post.innerHTML += `<article>
                         <header>
                           <h3>${dataTaken[number].title}</h3>
                         </header>
                         <section>
                           <p>${dataTaken[number].body}</p>
                         </section>
                         <footer>
                           <div class="tags">${button_T}</div>
                         </footer>
                         <div class="controls">
                           <button class="btn btn-danger btn-mini" onclick="deleteArticle(${number})">удалить</button>
                         </div>
                       </article>`;
}
completePosts();