const router = require("express").Router();
// const { v4: uuidv4 } = require('uuid');

// GET ROUTES
router.get("/", async (req, res) => {
  try {
    if (req.session.username) {
      res.render("homepage", {
        currentUser: req.session.username,
      });
    } else {
      res.render("homepage");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/snake", (req, res) => {
  res.render("snake", {
    layout: "main",
    currentUser: req.session.loggedIn,
  });
});

router.get("/tic-tac-toe", (req, res) => {
  res.render("tic-tac-toe", {
    layout: "main",
    currentUser: req.session.username,
  });
});

router.get("/connect4", (req, res) => {
  res.render("connect4", {
    layout: "main",
    currentUser: req.session.username,
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//SIGNUP
router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("register");
});

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
