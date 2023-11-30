const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

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

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);