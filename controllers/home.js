const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');

// GET ROUTES
router.get('/', async (req, res) => {
    try{
        res.render('homepage')
    } catch (err) { console.log(err) }
});

// app.get('/login', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/login.html'))
// );

// app.get('/minigames', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/minigames.html'))
// );

// app.get('/contact', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/contact.html'))
// );

// app.get('/leaderboard', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/leaderboard.html'))
// );

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );



module.exports = router;