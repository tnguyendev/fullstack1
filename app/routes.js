module.exports = function(app, passport, db) {

      app.get('/', function(req, res) {
          res.render('index.ejs');
      });
  
      app.get('/profile', isLoggedIn, function(req, res) {
          db.collection('notes').find({
            name: req.user.local.name
          }).toArray((err, result) => {
            if (err) return console.log(err)
            res.render('profile.ejs', {
              user : req.user,
              notes: result
            })
          })
      });

      app.get('/logout', function(req, res) {
          req.logout();
          res.redirect('/');
      });

      app.post('/messages', (req, res) => {
        db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/profile')
        })
      })
  
      app.delete('/messages', (req, res) => {
        db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
      })

      app.post('/update', (req, res) => {
        console.log(req.body)
        db.collection('notes').findOneAndUpdate({
          name: req.user.local.name
        },
        {
            $set: {
            notesList: req.body
          }
        },{
          upsert: true
        }, (err, result) => {
          if (err) return res.send(500, err)
          res.redirect('/profile')
        })
      })
  
      app.delete('/messages', (req, res) => {
        db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
          if (err) return res.send(500, err)
          res.send('Message deleted!')
        })
      })

          app.get('/login', function(req, res) {
              res.render('login.ejs', { message: req.flash('loginMessage') });
          });
  
          app.post('/login', passport.authenticate('local-login', {
              successRedirect : '/profile', 
              failureRedirect : '/login', 
              failureFlash : true 
          }));
  
          app.get('/signup', function(req, res) {
              res.render('signup.ejs', { message: req.flash('signupMessage') });
          });
  
          app.post('/signup', passport.authenticate('local-signup', {
              successRedirect : '/profile', 
              failureRedirect : '/signup', 
              failureFlash : true 
          }));
  
      app.get('/unlink/local', isLoggedIn, function(req, res) {
          var user            = req.user;
          user.local.email    = undefined;
          user.local.password = undefined;
          user.save(function(err) {
              res.redirect('/profile');
          });
      });
  
  };
  
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
  
      res.redirect('/');
  }
  