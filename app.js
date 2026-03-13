import express from 'express';

import dotenv from 'dotenv';

import mysql2 from 'mysql2';

import session from 'express-session';


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

app.use(session({ 
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.loggedIn = !!req.session.userId;
  res.locals.username = req.session.username || null;
  next();
});

function requireLogin(req, res, next) { // middleware function checking for login
  if (!req.session.userId) {
      return res.redirect("/sign-in");
  }
  next();
}



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

// Sign in Page
app.get('/', (req, res) => {
  res.redirect('/sign-in');
  res.render('sign_in_form');

});
app.get('/home', requireLogin, (req, res) => {
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
      req.session.userId, // get user ID
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
app.get('/my-games',requireLogin, async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM user_games WHERE user_id = ?',[req.session.userId]);
    res.render('games', { games: rows[0] }); // pass the query 
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).send('Database connection failed');
  }

});

// Wish list page
app.get('/wishlist', requireLogin, async (req, res) => {
    try {
    const rows = await pool.query('SELECT * FROM user_games WHERE user_id = ? AND wishlist = 1', [req.session.userId]);
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
  res.redirect('/my-games');
    }
    catch (err) {
    console.error('Error registering user:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.render('account_err', {
        message: 'Username or email already exists'
      });
    }

    return res.status(500).send('Error registering user');
  }

  });

  //Sign in page

  app.get('/sign-in', (req, res) => {
    res.render('sign_in_form');

}
  );
  app.post('/sign-in', async (req, res) => {
        const { username, password } = req.body;

    try {
      const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
      const params = [username, password];
      const [rows] = await pool.execute(sql, params);

      // Store the logged-in user's ID in the session
    req.session.userId = rows[0].user_id; // Assuming the user's ID is in the 'id' column
    req.session.username = rows[0].username; // Store the username in the session
    
    res.redirect('/home');
  }
  catch (err){
    console.error('Error signing in:', err);
    res.status(500).send('Error signing in');
  }

});


app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/home');
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});