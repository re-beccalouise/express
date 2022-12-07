const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');


//when we get a GET request do this...
app.get('/', (req, res) => {
    res.render('home');
});

//when we get a POST request to '/' do this...
app.post('/', (req, res) => {
    let {username, password} = req.body;

    //... check if user exists and password is correct

    res.redirect('/profile?username=' + username); //query string parameter
});

app.get('/profile', (req, res) => {

    console.log(req.query);

    res.render('profile', {username: req.query.username}); //renders page
});

app.post('/random-number', (req, res) => {
    let {max} = req.body;

    let randNum = Math.floor(Math.random() * max);
    
    res.status(200).send({randNum});
});

app.get('/api', (req, res) => {
    //send request to api 
    //take out just the data you want to display
    //template that data with handlebars
    //api.hbs

    res.render('api', {data});
});

app.listen(8000, () => {
    console.log('server listening on http://localhost:8000');
});