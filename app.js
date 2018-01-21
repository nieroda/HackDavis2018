const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      setRoutes      = require('./Routes/router');
      test           = require('./DAL/dbinsert'),
      methodOverride = require('method-override'),
      session        = require('express-session'),
      MySQLStore     = require('express-mysql-session')(session);

const port = process.env.PORT || 8080;

var options = {
  host: 'blue.cs.sonoma.edu',
  port: 3306,
  user: 'nkamm',
  password: '4793287',
  database: 'nkamm'
}

var sessionStore = new MySQLStore(options);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use('/', setRoutes);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
