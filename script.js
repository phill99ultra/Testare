//javascript method
/* window.onload = function(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){ 
        if(http.readyState == 4 && http.status == 200){ 
        console.log(JSON.parse(http.response));
        }
    };
    http.open("GET", "json/posts.json", true);
    http.send();
    
}; */
//jquery method   preluam datele din documentul extern in fisierul nostru
var json = $.get("json/posts.json", function(data){
    //console.log(data);
    return data;
});
//adaugam datele din fisier in localstorage
var localStorageAdd = function(){
    localStorage.setItem('Date_Base', JSON.stringify(json));
}
localStorageAdd();

var completePosts = function(){
    var dataTaken = JSON.parse(localStorage.getItem('Date_Base'));
    var post = document.getElementById('posts');
    console.log(dataTaken);
    /* for(i=0; i < dataTaken.length; i++){

    } */
    
}
completePosts()