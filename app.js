// import express
import express from 'express';

// create app instance
const app = express();

// ejs view engine setup
app.set('view engine', 'ejs');

// default route port
const PORT = 3003;

//enable static file serving
app.use(express.static('public'));

//Add middlwware that allow express to read from data and store it in req.body
app.use(express.urlencoded({ extended: true}));

//Create temp array 

const games =[];


// define routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/my-games', (req, res) => {
    res.render('games', {games });
});

app.get('/confirmation', (req, res) => {
    res.render('submit', { games: games });
});

// handles form submissions
app.post('/add-game', (req, res) => {
    
    const newGame = {
        title: req.body.title,
        status: req.body.status,
        rating: req.body.rating,
        genres: req.body.genres,
        timestamp: new Date().toLocaleString()
    };
    
    games.push(newGame);

    res.redirect('/confirmation');

   // res.render('form');
});

// route for wish-list
app.get('/confirmation', (req, res) => {
    res.render('submit');
});

// route for confirmation page/submit page
app.get('/add-game', (req, res) => {
    res.render('form');
});

//Submit game details


// start listening to server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});