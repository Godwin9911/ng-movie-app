// eslint-disable no-console, commented out all the authentication code and removed their dependency
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
// const flash = require('connect-flash');

const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
// const User = require('./models/userModel');
// const userRouter = require('./routes/userRouter')(User);
const movieRouter = require('./routes/movieRouter');

// passport Config
// require('./config/passport')(passport);

/* mongoose.connect('mongodb://localhost/ngmovieapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express Session
/* app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
*/

// passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

// app.use('/api/user', userRouter);
app.use('/api/movies', movieRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

// serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist', 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'))
  });
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port  ${port}`);
});
