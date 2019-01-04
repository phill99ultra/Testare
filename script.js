
 var json = [];  
 function getData(){
     $.get("json/posts.json")          
       .done(function(data){       
           json = data;             
           localStorageAdd();        
           console.log('DONE!')     
     })
       .fail(function(data){
           console.error('Fail!');    
       })
 }

 var formAddPost = document.getElementById('post-add');
 var post = document.getElementById('posts');  
 var buttonAddPost = formAddPost.getElementsByTagName('button')[0];  
 
 function init() {
     if(localStorage.getItem('date_base')){  
         parsing();                    
         complete_posts();              
     } else {
         getData();              
         setTimeout(() => { 
            parsing();           
            complete_posts();    
            console.log("complete");  
          }, 5000);
     }
        buttonAddPost.addEventListener("click", function (event) { 
        event.preventDefault();   
        //alert('New Post Added!');   
        addNewPost();   
     });
  }
 
 var localStorageAdd = function(){    
     localStorage.setItem('date_base', JSON.stringify(json));
 }
 
 var parsing = function(){    
   data_taken = JSON.parse(localStorage.getItem("date_base"));
 }
 var data_taken = '';  
 
 var complete_posts = function(){   
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
 
 function delete_post(number) {                                                     
     data_taken.splice(number, 1);    
     localStorage.setItem("date_base", JSON.stringify(data_taken));
     complete_posts();   
  } 
 
  function addNewPost() {  
     var title;    
     var body;
     var tags;
     var formInputs;  
     var newPost = {  
         id: data_taken.length + 1,
        title: '',
        body: '',
        tags: []
     };
  
     formInputs = formAddPost.querySelectorAll('[name]'); 
  
     for (var input of formInputs) {  
        if (input.name == 'title') {
           title = input.value;
        }
        if (input.name == 'body') {
           body = input.value;
        }
        if (input.name == 'tags') {
           tags = input.value;
        }
     }
     newPost.title = title;   
     newPost.body = body;     
     newPost.tags = tags.split(","); 
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
     //console.log(newPost); 
     data_taken.push(newPost);  
     localStorage.setItem("date_base", JSON.stringify(data_taken)); 
     complete_posts()  
 }
 init();  