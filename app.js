const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

require('./auth');


const app = express();
app.use(express.json()) // for the post and update request to work
app.use(bodyParser.json());

//-------------------------------------------------------------

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  });
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
  ));
  
  app.get( '/google/callback',
    passport.authenticate( 'google', {
      successRedirect: '/protected',
      failureRedirect: '/auth/google/failure'
    })
  );
  
  app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  });
  
  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });
  
  app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
//-------------------------------------------------------------

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const HOST = 'localhost';
const PORT = 8080;

const booksRoutes = require('./routes/books')

app.use(booksRoutes);

app.listen(PORT, () => console.log(`App runing at ${HOST}:${PORT}`));