const myform = document.getElementById("thisForm")
myform.addEventListener("submit", function(event){
    event.preventDefault();

    const formData = new FormData(this);
    const formData2 = formData;
    
    fetch('http://127.0.0.1:8090/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            alert("Your submission was successful!")
          } 
        else {
            throw Error(response.statusText);
          }
    })
    .then(function(){
        return fetch('http://127.0.0.1:8090/newdirector', {
        method: 'POST',
        body: formData2
        });
    })
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            alert("You are now listed in our database.");
          } 
        else {
            throw Error(response.statusText);
          }
    })
    .then(function(){
        updateCards()
    })
    .catch((error) => {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else if (x == "Error: Conflict") {
            alert("This director is already listed in our database.");
        }
        else{
            alert(x);
        }
        return
    });
    
});


fetch('http://127.0.0.1:8090/director')
    .then(response => {
        if (!response.ok) {
            throw new Error('Response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        var divElem = ""
        const length = Object.keys(data).length;
        for(var i = 0; i < length; i++) {
            divElem += '<div class="col-12 col-md-6 col-lg-4"><div class="card"><div class="card-body">' 
            divElem += '<h3 class="card-title">' + data[i].name + '</h3>'
            divElem += '<h6 class="card-hometown">' + data[i].hometown + '</h6>'
            divElem += '<p class="card-text">“' + data[i].motto + '”</p>'
            divElem += '</div></div></div>'
        }
        var contain = document.getElementById('displayDirectors');
        contain.innerHTML = divElem;
    })
    .catch((error) => {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else{
            alert(x);
        }
        return
    });
    


function updateCards() {
    fetch('http://127.0.0.1:8090/director')
    .then(response => {
        if (!response.ok) {
            throw new Error('Response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        var divElem = ""
        const length = Object.keys(data).length;
        for(var i = 0; i < length; i++) {
            divElem += '<div class="col-12 col-md-6 col-lg-4"><div class="card"><div class="card-body">' 
            divElem += '<h3 class="card-title">' + data[i].name + '</h3>'
            divElem += '<h6 class="card-hometown">' + data[i].hometown + '</h6>'
            divElem += '<p class="card-text">“' + data[i].motto + '”</p>'
            divElem += '</div></div></div>'
        }
        var contain = document.getElementById('displayDirectors');
        contain.innerHTML = divElem;
    })
    .catch((error) => {
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