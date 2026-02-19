// import express
import express from 'express';

// create app instance
const app = express();

// default route port
const PORT = 3003;

//enable static file serving
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});


// start listening to server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});