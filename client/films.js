const allfilmbutton = document.getElementById('allButton');
allfilmbutton.addEventListener('click', function(){loadAllFilms();});

//pre-clicks all films so that all films are displayed first
document.addEventListener('DOMContentLoaded', function(){
    allfilmbutton.click();
    allfilmbutton.focus();
});

function loadAllFilms(){
    fetch('http://127.0.0.1:8090/film')
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } 
        else {
            throw Error(response.statusText);
          }
    })
    .then(data => {
        var divElem = "";
        const length = Object.keys(data).length;
        for(var i = 0; i < length; i++) {
            divElem += '<div class="box pt-3 pb-3">' 
            divElem += '<div class="box-img"><img src=' + data[i].poster + ' id="' + data[i].id +'" ></div>'
            divElem += '<h3>' + data[i].title + '</h3>'
            divElem += '<span>' + data[i].genre + '</span></div>'
        }
        var contain = document.getElementById('displayFilms');
        contain.innerHTML = divElem;
    })
    .catch(error=> {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else{
            alert(x);
        }
        return
    });
};

const actionbutton = document.getElementById('actionButton');
const familybutton = document.getElementById('familyButton');
const comedybutton = document.getElementById('comedyButton');
const horrorbutton = document.getElementById('horrorButton');
const dramabutton = document.getElementById('dramaButton');

actionbutton.addEventListener('click', function(){replaceFilm('Action')});
familybutton.addEventListener('click', function(){replaceFilm('Family')});
comedybutton.addEventListener('click', function(){replaceFilm('Comedy')});
dramabutton.addEventListener('click', function(){replaceFilm('Drama')});
horrorbutton.addEventListener('click', function(){replaceFilm('Horror')});

// replaces div content with whatever genre was selected
function replaceFilm(genre) {
    fetch('http://127.0.0.1:8090/genre?genre='+genre)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
              } 
            else {
                throw Error(response.statusText);
              }
        })
        .then(data => {
            var divElem = "";
            const length = Object.keys(data).length;
            for(var i = 0; i < length; i++) {
                divElem += '<div class="box pt-3 pb-3">' 
                divElem += '<div class="box-img"><img src=' + data[i].poster + ' id="' + data[i].id +'" ></div>'
                divElem += '<h3>' + data[i].title + '</h3>'
                divElem += '<span>' + data[i].genre + '</span></div>'
            }
            var contain = document.getElementById('displayFilms');
            contain.innerHTML = divElem;
        })
        .catch(error=> {
            x = String(error)
            if (x == "TypeError: Failed to fetch"){
                alert("Sorry! Server is down. Please try again in a few minutes.")
            }
            else{
                alert(x);
            }
            return
        });
};


//display modal when film is clicked
document.getElementById('displayFilms').addEventListener('click', function(e){
    //e.target is the clicked element
    var clicked = e.target;
    if (clicked.nodeName == 'IMG'){
        createModal(clicked.id)
        var modal = document.getElementById("Modal");
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(e) {
            if (e.target == modal) {
              modal.style.display = "none";
            }
        }    
}});

async function createModal(id){
    fetch('http://127.0.0.1:8090/film/'+id)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
              } 
            else {
                throw Error(response.statusText);
              }
        })
        .then(data => {
            var modalcontain = document.getElementById('mcontent');
            var filmInfo = "";
            filmInfo += '<h1>' + data.title + '</h1>'
            filmInfo += '<h6>' + data.genre + '</h6>'
            filmInfo += '<p>' + data.synopsis + '</p>'
            modalcontain.innerHTML = filmInfo;
            return data.directorID
        })
        .then(data => {
            return fetch('http://127.0.0.1:8090/director/'+data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            var directorInfo = ""
            directorInfo += '<h6>Directed by: ' + data.name + ', ' + data.hometown +'</h6>'
            var modalcontain = document.getElementById('mcontent');
            modalcontain.insertAdjacentHTML('beforeend', directorInfo);
        })
        .catch(error=> {
            x = String(error)
            if (x == "TypeError: Failed to fetch"){
                alert("Sorry! Server is down. Please try again in a few minutes.")
            }
            else{
                alert(x);
            }
            return
        });
}
