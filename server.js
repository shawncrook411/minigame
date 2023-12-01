const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.port || 3001;
const hbs = exphbs.create({ helpers })

const cookieSession = {
  secret: 'test',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(cookieSession))

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//GET ROUTES
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/login', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/login.html'))
);

app.get('/minigames', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/minigames.html'))
);

app.get('/contact', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/contact.html'))
);

app.get('/leaderboard', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/leaderboard.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at localhost:${PORT}`));
});
