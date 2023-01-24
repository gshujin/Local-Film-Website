const form = document.getElementById('deleteForm');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const filmNameform = form.elements['Film'] 
    const emailform = form.elements['Email'] 

    let filmName = filmNameform.value
    let email = emailform.value
    
    fetch('http://127.0.0.1:8090/deleteFilm/'+filmName+'/'+email, { method: 'DELETE' })
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                alert("Deleted successfully.")
                return response.json();
              } 
            else {
                throw Error(response.statusText);
              }
        })
        .then(() => {
            updateFilmTable()
        })
    .catch(error => {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else{
            alert(x);
        }
        return
    });
});

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
        var tableBody = document.getElementById('tableBody');
        for(item in data){
            const object = data[item]
            let row = document.createElement('tr');
            let row_data1 = document.createElement('td');
            row_data1.innerHTML = object.id;

            let row_data2 = document.createElement('td');
            row_data2.innerHTML= object.title;

            let row_data3 = document.createElement('td');
            row_data3.innerHTML = object.genre;

            let row_data4 = document.createElement('td');
            row_data4.innerHTML = object.director;


            row.appendChild(row_data1);
            row.appendChild(row_data2);
            row.appendChild(row_data3);
            row.appendChild(row_data4);

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else{
            alert(x);
        }
        return
    });


const form2 = document.getElementById('deleteDirectorForm');
form2.addEventListener('submit', function(e){
    e.preventDefault();

    const nameform = form2.elements['DirectorName'] 
    const emailform = form2.elements['Emailaddress'] 

    let thename = nameform.value
    let theemail = emailform.value
    
    fetch('http://127.0.0.1:8090/deleteDirector/'+thename+'/'+theemail, { method: 'DELETE' })
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                alert("Deleted successfully.")
                return response.json();
              } 
            else {
                throw Error(response.statusText);
              }
        })
        .then(
            () => {updateTable()}
        )
        .catch(error => {
            x = String(error)
            if (x == "TypeError: Failed to fetch"){
                alert("Sorry! Server is down. Please try again in a few minutes.")
            }
            else{
                alert(x);
            }
            return
        });
    });


fetch('http://127.0.0.1:8090/director')
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } 
        else {
            throw Error(response.statusText);
          }
    })
    .then(data => {
        var tableBody = document.getElementById('tableBodyD');
        for(item in data){
            const object = data[item]
            let row = document.createElement('tr');
            let row_data1 = document.createElement('td');
            row_data1.innerHTML = object.name;

            let row_data2 = document.createElement('td');
            row_data2.innerHTML= object.hometown;

            row.appendChild(row_data1);
            row.appendChild(row_data2);

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        x = String(error)
        if (x == "TypeError: Failed to fetch"){
            alert("Sorry! Server is down. Please try again in a few minutes.")
        }
        else{
            alert(x);
        }
        return
    });


function updateTable() {
    fetch('http://127.0.0.1:8090/director')
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } 
        else {
            throw Error(response.statusText);
          }
    })
    .then(data => {
        var tableBody = document.getElementById('tableBodyD');
        tableBody.innerHTML = '';
        for(item in data){
            const object = data[item]
            let row = document.createElement('tr');
            let row_data1 = document.createElement('td');
            row_data1.innerHTML = object.name;

            let row_data2 = document.createElement('td');
            row_data2.innerHTML= object.hometown;

            row.appendChild(row_data1);
            row.appendChild(row_data2);

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
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


function updateFilmTable() {
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
        var tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        for(item in data){
            const object = data[item]
            let row = document.createElement('tr');
            let row_data1 = document.createElement('td');
            row_data1.innerHTML = object.id;

            let row_data2 = document.createElement('td');
            row_data2.innerHTML= object.title;

            let row_data3 = document.createElement('td');
            row_data3.innerHTML = object.genre;

            let row_data4 = document.createElement('td');
            row_data4.innerHTML = object.director;


            row.appendChild(row_data1);
            row.appendChild(row_data2);
            row.appendChild(row_data3);
            row.appendChild(row_data4);

            tableBody.appendChild(row);
        }
    })
    .catch(error => {
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