import express from 'express';

const app = express();
const PORT = 3003;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const games = [];

// Home
app.get('/', (req, res) => {
  res.render('home');
});

// Show form
app.get('/add-game', (req, res) => {
  res.render('form');
});

// Handle form submit
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
});

// Confirmation page (submit.ejs)
app.get('/confirmation', (req, res) => {
  res.render('submit', { games });
});

// Games list page
app.get('/my-games', (req, res) => {
  res.render('games', { games });
});

// Wish list page
app.get('/wish-list', (req, res) => {
  res.render('wish-list');
});

// Register page
app.get('/register', (req,res) => {
  res.render('register_form');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});