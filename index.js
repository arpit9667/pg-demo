const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log("Datebase Connected.."))
    .catch(err => console.log('Error:' + err));

const app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// gig routes
app.use('/gigs', require('./routes/gigs'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is Up on port ${PORT}`));