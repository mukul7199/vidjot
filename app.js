
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('Mongodb connected.'))
    .catch((e) => console.log(e));

// Load idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index route
app.get('/', (req, res) => {
    const title = 'Welcome'
    res.render('index', {
        title
    });
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Idea index page
app.get('/ideas', (req, res)=> {
    Idea.find({})
        .sort({date: 'desc'})
        .then((ideas) => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Add idea route
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// Edit idea form
app.get('/ideas/edit/:id', (req, res) => {
    res.render('ideas/edit');
});

// Process form
app.post('/ideas', (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }
    new Idea(newUser)
        .save()
        .then((idea) => {
            res.redirect('/ideas');
        })
});


const port = 5000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});