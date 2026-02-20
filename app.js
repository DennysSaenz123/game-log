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


// define routes
app.get('/', (req, res) => {
    res.render('home');
});
// route for games page
app.get('/my-games', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/games.html`);
});

// route for wishlist page
app.get('/wishlist', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/wish-list.html`);
});

// route for form page
app.get('/add-game', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/form.html`);
});

// start listening to server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});