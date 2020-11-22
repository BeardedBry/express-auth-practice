// npm modules
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');


// create the server
const app = express();

// add & configure middle ware.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware');
        console.log(req.sessionID);
        return uuidv4();
    },
    store: new FileStore(),
    secret: 'burkard',
    resave: false,
    saveUninitialized: true,
}));

// Create home page route at '/'
app.get('/', (req, res) => {
    console.log('Inside the homepage cb function.');
    console.log(req.sessionID);
    //const uniqueId = uuidv4();
    res.send(`you just hit the home page without restarting the server. id: ${req.sessionID} \n`);
});

// Create login get and post routes
app.get('/login', (req, res)=>{
    console.log('inside GET /login cb');
    console.log(req.sessionID);
    res.send('you hit the login page!');
});

app.post('/login', (req,res)=>{
    console.log('inside the POST /login cb');
    console.log(req.body);
    res.send('You posted to the login page.');
});


// tell the server what port to listen on
app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});

