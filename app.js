import express from 'express';

import dotenv from 'dotenv';

import mysql2 from 'mysql2';

//dotenv config
dotenv.config();

// temporary user id for testing
const CURRENT_USER_ID = 1; // <- This acts as the current user that's logged in. This changes in a real app, until we get login and registration fully working.


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

const games = []; //in-memory array


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
app.post('/add-game', async (req, res) => {

  const gameForm = req.body;

  try {
    const sql = 'INSERT INTO user_games (user_id, title, status, rating, genres, wishlist,notes) VALUES (?,?,?,?,?,?,?)';

    const params = [
      CURRENT_USER_ID,
      gameForm.title ?? null,
      gameForm.status ?? null,
      gameForm.rating ? Number(gameForm.rating) : null,
      gameForm.genres ?? null,
      1, // this is the wishlist flag. set to 1 for now
      gameForm.notes ?? null
    ];

    const [result] = await pool.execute(sql, params);
    console.log('Game registered:', result);

  } catch (error) {
    console.error('Error submitting game:', error);
    return res.status(500).send('Error submitting game');
  }
  res.redirect('/my-games');
});


// Games list page
app.get('/my-games', async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM user_games WHERE user_id = ?', [CURRENT_USER_ID]);
    res.render('games', { games: rows[0] }); // pass the query 
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }

});

// Wish list page
app.get('/wishlist', async (req, res) => {
    try {
    const rows = await pool.query('SELECT * FROM user_games WHERE user_id = ? AND wishlist = 1', [CURRENT_USER_ID]);
    res.render('wish-list', { games: rows[0] }); // pass the query 
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }

});

// Registration page
app.get('/register', (req, res) => {

  res.render('register_form');

});

// Registration form handling
app.post('/register', async (req, res) => {
    const prof = req.body;
  try {
    const sql = 'INSERT INTO users (first_name,last_name,username, email, password) VALUES (?,?,?,?,?)'

    const params = [
      prof.firstName,
      prof.lastName,
      prof.username,
      prof.email,
      prof.password
    ];
    const result = await pool.execute(sql, params);
    console.log('User registered:', result);
  res.redirect('/confirmation');
    }
    catch (err){
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user');
    }

  });

  //Sign in page
  app.get('/sign-in', (req, res) => {
    res.render('sign_in_form');
  }
  );
  


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});