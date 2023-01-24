// const app = require('.testScripts/app');

var express = require('express');
var app = express();
const fs = require('fs');
const multer = require('multer');
var path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('client'));
app.use('/poster', express.static('client/upload/posters'));

const storage = multer.diskStorage({
    destination: 'client/upload/posters',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
})


// upload new film entry 
app.post("/upload", upload.single('poster'),(req,res)=>{
    let config = JSON.parse(fs.readFileSync('filmData.json').toString());
    var films_data = config;

    const director = req.body.name
    const title = req.body.title;
    const genre = req.body.genre;
    const synopsis = req.body.synopsis;
    const img_path = "upload" + "\\" + "posters" + "\\"
    const poster = req.file.filename
    const directorID = req.body.email
    const new_entry =   {
        "id": `${Date.now()}`,
        "title":title,
        "genre":genre,
        "poster":img_path.concat(poster),
        "synopsis":synopsis,
        "directorID":directorID,
        "director": director
      };
    films_data.push(new_entry)
    var new_data = JSON.stringify(films_data, null, 2);
    fs.writeFile('filmData.json', new_data, finished);

    function finished(err) {
    ;
    }
    res.sendStatus(200)
})

//gets list of all films
app.get('/film', function(req,resp){
    let config = JSON.parse(fs.readFileSync('filmData.json').toString());
    var films_data = config;
    resp.json(films_data);
});

//gets film by ID 
app.get('/film/:id', function(req,resp){
    let config = JSON.parse(fs.readFileSync('filmData.json').toString());
    var films_data = config;
    const filmID = req.params.id;
    
    
    for (let i in films_data){
        let object = films_data[i]
        if (object.id == filmID){
            return resp.json(object);
        }
    };
    return resp.status(404).json({ status: 'Not Found'});

});

//filters films by genre example: http://127.0.0.1:8090/genre?genre=Horror
app.get('/genre', function(req,resp){
    let config = JSON.parse(fs.readFileSync('filmData.json').toString());
    var films_data = config;
    var genre = String(req.query.genre)

    let result = []
    for (let key in films_data){
        let object = films_data[key]
        if (object.genre == genre){
            result.push(object)
        }   
    }
    if (result.length == 0){
        return resp.status(404).json({ status: 'Not Found'});
    }
    return resp.json(result);
});

//gets list of all directors 
app.get('/director', function(req,resp){
    let config1 = JSON.parse(fs.readFileSync('directors.json').toString());
    var directors_data = config1;
    resp.json(directors_data);
});

//gets director by ID
app.get('/director/:id', function(req,resp){
    let config = JSON.parse(fs.readFileSync('directors.json').toString());
    var directors_data = config;
    var dirID = String(req.params.id);

    for (let i in directors_data){
        let object = directors_data[i]
        if (object.directorID == dirID){
            return resp.json(object);
        }
    };
    return resp.status(404).json({ status: 'Not Found'});
});

//gets number of film a director has by id
app.get('/directorfilms/:id', function(req,resp){
    let config1 = JSON.parse(fs.readFileSync('filmData.json').toString());
    var film_data = config1;

    const id = req.params.id;
    let results = [];

    for (item in film_data){
        const object = film_data[item]
        if (object.directorID == id){
            results.push(object.title)
        }
    }

    resp.json(results);
});

//insert new director entry
app.post('/newdirector', upload.any(),function(req,resp){
    let config1 = JSON.parse(fs.readFileSync('directors.json').toString());
    var directors_data = config1;

    const email = req.body.email;
    const name = req.body.name;
    const hometown = req.body.hometown;
    const motto = req.body.motto;

    for(i in directors_data){
        if (directors_data[i].directorID === email){
            return resp.status(409).json({ status: 'Conflict'});
        }
    };

    const new_director = {
        "directorID": email,
        "name": name,
        "hometown": hometown,
        "motto": motto
    }

    directors_data.push(new_director)
    var new_data = JSON.stringify(directors_data, null, 2);
    fs.writeFile('directors.json', new_data, finished);
    function finished(err) {
        ;
    }
    return resp.sendStatus(200)
})

// search by keyword, (http://127.0.0.1:8090/search/new%20york)
app.get('/search/:keyword', function(req,resp){
    var keyword = req.params.keyword;
    let directors_data = JSON.parse(fs.readFileSync('directors.json').toString());
    let films_data = JSON.parse(fs.readFileSync('filmData.json').toString());

    const searchResult = []
    for(let i in directors_data){
        let object = directors_data[i]
        for(let x in object){
            if (partMatches(object[x], keyword)) { 
                searchResult.push(object);
            }
        }
    }

    for(let i in films_data){
        let object = films_data[i]
        for(let item in object){
            if (partMatches(object[item], keyword)){ 
                searchResult.push(object)
            }
        }
    }
    
    if(searchResult.length == 0){
        return resp.status(404).json({ status: 'Not Found'});
    }
    else{
        return resp.status(200).json(searchResult);
    }
});


function partMatches(string, keyword){
    const stringuncap = string.toString().toLowerCase();
    const keyworduncap = keyword.toString().toLowerCase();
    return stringuncap.includes(keyworduncap);
}

//deletes film by ID
app.delete('/deleteFilm/:id/:email', function(req,resp){
    let fconfig = JSON.parse(fs.readFileSync('filmData.json').toString());
    var films_data = fconfig;
    const id = req.params.id
    const email = req.params.email;
    let remainingData = [];
    let tobeDeleted =[];

    for (let key in films_data){
        let object = films_data[key]
        if (object.id != id){
            remainingData.push(object)
        }
        else{
            tobeDeleted.push(object)
        }
    }
    
    const length = Object.keys(tobeDeleted).length
    if (length == 0){
        return resp.status(404).json({ status: 'Not Found'});
    }
    else {
        deleteThis = tobeDeleted[0]
        if (deleteThis.directorID == email){
            var new_data = JSON.stringify(remainingData, null, 2);
            fs.writeFile('filmData.json', new_data, finished);
            function finished(err) {
                ;
            }
            return resp.status(200).json({ status: 'OK'});
        }
        else{
            return resp.status(403).json({ status: 'Forbidden'});
        }
    }   

    
});

//delete director by name and email
app.delete('/deleteDirector/:name/:email', function(req, resp){
    let fconfig = JSON.parse(fs.readFileSync('directors.json').toString());
    var films_data = fconfig;

    const name = req.params.name
    const email = req.params.email;
    
    let remainder = [];
    let tobeDeleted = [];

    for (let item in films_data) {
        object = films_data[item]
        if (object.name != name){
            remainder.push(object)
        }
        else{
            tobeDeleted.push(object)
        }
    }

    if (Object.keys(tobeDeleted).length == 0){
        return resp.sendStatus(404);
    }

    else {
        deleteThis = tobeDeleted[0]
    }   

    if (deleteThis.directorID == email){
        var new_data = JSON.stringify(remainder, null, 2);
        fs.writeFile('directors.json', new_data, finished);
        function finished(err) {
            ;
        }
        return resp.status(200).send({ status: 'OK'});
    }
    else{
        return resp.sendStatus(403);
    }
});

app.listen(8090);
