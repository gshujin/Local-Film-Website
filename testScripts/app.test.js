'use strict';

const request = require('supertest');
const app = require('./app')

describe('Test list of films', () => {
    test('GET /film succeeds', () => {
        return request(app)
        .get('/film')
        .expect(200);
    });

    test('GET /film returns JSON', () => {
        return request(app)
        .get('/film')
        .expect('Content-type', /json/);
    })

    test('GET /film/:id succeeds', () => {
        return request(app)
        .get('/film/1')
        .expect(200);
    })

    test('GET /film/:id returns JSON', () => {
        return request(app)
        .get('/film/1')
        .expect('Content-type', /json/);
    })

    test('GET /film/:id returns 404 when film ID does not exist', () => {
        return request(app)
        .get('/film/9999999')
        .expect(404);
    })
});


describe('Test list of film of a genre', () => {
    test('GET /genre for horror succeeds', () => {
        return request(app)
        .get('/genre?genre=Horror')
        .expect(200);
    });

    test('GET /genre for comedy succeeds', () => {
        return request(app)
        .get('/genre?genre=Comedy')
        .expect(200);
    });

    test('GET /genre for drama succeeds', () => {
        return request(app)
        .get('/genre?genre=Drama')
        .expect(200);
    });

    test('GET /genre for action succeeds', () => {
        return request(app)
        .get('/genre?genre=Action')
        .expect(200);
    });

    test('GET /genre for family succeeds', () => {
        return request(app)
        .get('/genre?genre=Family')
        .expect(200);
    });

    test('GET /genre for horror returns JSON', () => {
        return request(app)
        .get('/genre?genre=Horror')
        .expect('Content-type', /json/);
    });
    
    test('GET /genre for comedy returns JSON', () => {
        return request(app)
        .get('/genre?genre=Comedy')
        .expect('Content-type', /json/);
    });

    test('GET /genre for drama returns JSON', () => {
        return request(app)
        .get('/genre?genre=Drama')
        .expect('Content-type', /json/);
    });

    test('GET /genre for action returns JSON', () => {
        return request(app)
        .get('/genre?genre=Action')
        .expect('Content-type', /json/);
    });

    test('GET /genre for family returns JSON', () => {
        return request(app)
        .get('/genre?genre=Family')
        .expect('Content-type', /json/);
    });

    test('GET /genre returns 404 when genre does not exist', () => {
        return request(app)
        .get('/genre?genre=Dummy')
        .expect(404);
    });
})

describe('Test list of directors', () => {
    test('GET /director succeeds', () => {
        return request(app)
        .get('/director')
        .expect(200)
    })

    test('GET /director returns JSON', () => {
        return request(app)
        .get('/director')
        .expect('Content-type', /json/);
    })

    test('GET /director/:id succeeds', () => {
        return request(app)
        .get('/director/director1@gmail.com')
        .expect(200)
    })

    test('GET /director/:id returns JSON', () => {
        return request(app)
        .get('/director/director1@gmail.com')
        .expect('Content-type', /json/);
    })

    test('GET /director/:id returns 404 when director does not exist', () => {
        return request(app)
        .get('/director/abc')
        .expect(404);
    })

})

describe('Test number of films by a director', () => {
    test('GET /directorfilms/:id succeeds', () => {
        return request(app)
        .get('/directorfilms/director1@gmail.com')
        .expect(200);
    });

    test('GET /directorfilms/:id returns JSON', () => {
        return request(app)
        .get('/directorfilms/director1@gmail.com')
        .expect('Content-type', /json/);
    })
});

describe('Test search by keyword result', () => {
    test('GET /search/:keyword succeeds', () => {
        return request(app)
        .get('/search/director')
        .expect(200);
    });

    test('GET /search/:keyword returns JSON', () => {
        return request(app)
        .get('/search/director')
        .expect('Content-type', /json/);
    })

    test('GET /search/:keyword returns 404 when nothing is found.', () => {
        return request(app)
        .get('/search/egyewu')
        .expect(404);
    })
});

describe('Test uploading new film entry', () => {
    test('POST /upload succeeds', () => {
        return request(app)
        .post('/upload')
        .field("name", "John Doe")
        .field("title", "Test Title")
        .field("genre", "Horror")
        .field("synopsis", "Synopsis synopsis synopsis")
        .field("email", "testemail@gmail.com")
        .attach("poster", "client\\upload\\posters\\img2action.jpg")
        .expect(200)
    })
});

describe('Test uploading new director entry', () => {
    test('POST /newdirector succeeds', () => {
        return request(app)
        .post('/newdirector')
        .field("name", "John Doe")
        .field("email", "test@gmail.com")
        .field("hometown", "Durham")
        .field("motto", "Inserts a cliche quote.")
        .expect(200)
    })

    test('POST /newdirector returns fail if director already exists', () => {
        return request(app)
        .post('/newdirector')
        .field("name", "John Doe")
        .field("email", "director1@gmail.com")
        .field("hometown", "Durham")
        .field("motto", "Inserts a cliche quote.")
        .expect('Content-type', /json/)
    })
});

describe('Test deleting a film', () => {
    test('DELETE /deleteFilm/:id/:email succeeds', () => {
        return request(app)
        .delete('/deleteFilm/1/director1@gmail.com')
        .expect(200)
    })

    test('DELETE /deleteFilm/:id/:email returns 404 if ID does not exist', () => {
        return request(app)
        .delete('/deleteFilm/bfsdbf/director1@gmail.com')
        .expect(404)
    })

    test('DELETE /deleteFilm/:id/:email returns 403 if email does not match', () => {
        return request(app)
        .delete('/deleteFilm/3/director1@gmail.com')
        .expect(403)
    })
})

describe('Test deleting a director', () => {
    test('DELETE /deleteDirector/:name/:email succeeds', () => {
        return request(app)
        .delete('/deleteDirector/John%20Doe/test@gmail.com')
        .expect(200)
    })

    test('DELETE /deleteDirector/:id/:email returns 404 if director does not exist', () => {
        return request(app)
        .delete('/deleteDirector/bfsdbf/director1@gmail.com')
        .expect(404)
    })

    test('DELETE /deleteDirector/:id/:email returns 403 if email does not match', () => {
        return request(app)
        .delete('/deleteDirector/Hannah%20Baker/director1@gmail.com')
        .expect(403)
    })
})