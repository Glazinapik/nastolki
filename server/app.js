require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const FileStore = require('session-file-store')(session);

const path = require('path');

const { PORT, COOKIE_SECRET, COOKIE_NAME } = process.env;
const authRouter = require('./src/routes/auth.router');
const usersRouter = require('./src/routes/users.router');
const meetingRouter = require('./src/routes/meeting.router');
const playersRouter = require('./src/routes/players.router');
const gamesRouter = require('./src/routes/games.router');

const app = express();

app.set('cookieName', COOKIE_NAME);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: app.get('cookieName'),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, 
    },
  }),
);
app.use(express.static(path.resolve(process.env.PWD, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/meeting', meetingRouter);
app.use('/players', playersRouter);
app.use('/games', gamesRouter);

app.listen(3001, () => {
  console.log('Сервер запущен на порте', PORT);
});
