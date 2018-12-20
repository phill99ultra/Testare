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
    localStorage.setItem('date_base', JSON.stringify(json));
}
localStorageAdd();

var data_taken = JSON.parse(localStorage.getItem("date_base"));

var complete_posts = function(){
    var post = document.getElementById("posts");
    post.innerHTML = '';
    for(var i in data_taken){
          new_post(i);
    }
}

var new_post = function(number){
    var article = document.getElementById("posts");

    var tags = function(num){
        tag_button = '';
        for(var tag in data_taken[num].tags){
           tag_button += `<button class="btn btn-xs btn-default">${data_taken[number].tags[tag]}</button>`;
        }
        return tag_button;
    }
    var button_t = tags(number);
    article.innerHTML += `<article>
                         <header>
                           <h3>${data_taken[number].title}</h3>
                         </header>
                         <section>
                           <p>${data_taken[number].body}</p>
                         </section>
                         <footer>
                           <div class="tags">${button_t}</div>
                         </footer>
                         <div class="controls">
                           <button class="btn btn-danger btn-mini" onclick="delete_tag(${number})">удалить</button>
                         </div>
                       </article>`;
}
complete_posts();

function delete_tag(number) {                                                                 
    dataTaken.splice(number, 1);
    localStorage.setItem("date_base", JSON.stringify(data_taken));
    complete_posts();
 }

 var add_new_post = function(post){
    var title = post.title.value;
    var body = post.body.value;
    var tags = post.tags.value;
    var new_post = {
           "id" : data_taken.length + 1,
        "title" : title,
         "body" : body,
         "tags" : tags
    };

    tags = tags.split(",");
       var reg = /^[а-яА-ЯёЁa-zA-Z 0-9]+$/;
       if (title.length < 5 && !reg.test(title)) {
          return false;
       }
       if (body.length < 30 && !reg.test(body)) {
          return false;
       }
       if (tags.length < 1 && !reg.test(tags)) {
          return false;
       }
       console.log(new_post);
       //data_taken.push(new_post);
       //localStorage.setItem("date_base", JSON.stringify(data_taken));
       //complete_posts()
  }