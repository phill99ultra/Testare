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

var dataTaken = JSON.parse(localStorage.getItem("date_base"));

var complete_posts = function(){
    var post = document.getElementById("posts");
    post.innerHTML = '';
    for(var i in dataTaken){
          new_post(i);
    }
}

var new_post = function(number){
    var article = document.getElementById("posts");

    var tags = function(num){
        tagButton = '';
        for(var tag in dataTaken[num].tags){
           tagButton += `<button class="btn btn-xs btn-default">${dataTaken[number].tags[tag]}</button>`;
        }
        return tagButton;
    }
    var button_t = tags(number);
    article.innerHTML += `<article>
                         <header>
                           <h3>${dataTaken[number].title}</h3>
                         </header>
                         <section>
                           <p>${dataTaken[number].body}</p>
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
    localStorage.setItem("date_base", JSON.stringify(dataTaken));
    complete_posts();
 }

 var add_new_post = function(post){
    var title = post.title.value;
    var body = post.body.value;
    var tags = post.tags.value;
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

       dataTaken[id] += 1;
       dataTaken[title] += title;
       dataTaken[body] += body;
       dataTaken[tags] += tags;

      dataTaken.push(post);
      localStorage.setItem("Data_Base", JSON.stringify(dataTaken));
      completePosts();
  }