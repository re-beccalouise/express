const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const fetch = require('node-fetch');
const { runInNewContext } = require('vm');
const { equal } = require('assert');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

let books = [{title:'normal people', author:'sally rooney'}, {title:'ghosts', author:'dolly alderton'}];

//when we get a GET request do this...
app.get('/', (req, res) => {
    res.render('home', {books});
});


app.get('/books/:bookID', (req, res) => {
    res.render('book', books[req.params.bookID]);
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

app.get('/api', async (req, res) => {

    let data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Liverpool,GB&units=metric&appid=857c3164a727aa134aae02a6ba1e1a77');

    data = await data.json();
    
    let obj = {
    description: data.weather[0].description,
    temp: data.main.temp,
    min: data.main.temp_min,
    max: data.main.temp_max,
    }

    res.render('api', obj);
});


app.get('/books/:bookID', (req, res) => {
    console.log(req.params);

    res.send('ok');
});

app.get('*', (req, res) => {
    res.render('404');
});

//* going to catch all routes, does it match anything>
//must go at the very bottom, just above app.listen


app.listen(8000, () => {
    console.log('server listening on http://localhost:8000');
});