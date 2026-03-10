import express from 'express';

import dotenv from 'dotenv';

import mysql2 from 'mysql2';

//dotenv config
dotenv.config();


// POOL
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}).promise();

const app = express();
const PORT = 3003;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const games = [];

// Database Connection Test Route
app.get('/db-test', async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM user_games');
    res.send(rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }
});
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

app.get('/register', (req, res) => {
  res.render('register_form');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});