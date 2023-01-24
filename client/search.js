const searchbtn = document.getElementById('searchbtn');

searchbtn.addEventListener('click', function(e){
    e.preventDefault()
    var text = document.getElementById('searchinput').value
    
    fetch('http://127.0.0.1:8090/search/'+text)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
              } 
            else {
                throw Error(response.statusText);
              }
        })
        .then(data => {
            clearBox('searchdiv')
            let contain = document.getElementById('searchdiv');
            contain.style = ''
            
            for (let item in data) {
                let object = data[item]
                const keys = Object.keys(object);
                let card1 = document.createElement('card')
                card1.className = "display card"
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (key != "directorID" && key != "poster"){
                        let uinfo = document.createElement('ul')
                        uinfo.innerText = key.capitalize() + ': ' + object[key]
                        card1.appendChild(uinfo)
                    }
                }
                contain.appendChild(card1)
            }
            return
        })
        .catch(error=> {
            x = String(error)
            x = String(error)
            if (x == "TypeError: Failed to fetch"){
                alert("Sorry! Server is down. Please try again in a few minutes.")
            }
            else{
                clearBox('searchdiv')
                let contain = document.getElementById('searchdiv');
                contain.style.color = 'white';
                contain.innerText = x;
                return
            }           
        });
});


//helper functions

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

function clearBox(elementID) {
    var div = document.getElementById(elementID);
    
    while(div.firstChild) {
    div.removeChild(div.firstChild);
    }
}