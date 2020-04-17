var models = require('../models');

//controller is the logic and the glue between the model and views so we can call our model to get the data and pass that to the view

module.exports = {
  messages: {
    get: function (req, res) {
        //req includes constraints
      models.messages.get((err, req) => {
        if (err) {
          res.statusCode = 404;
          res.send(err);
        } else {
          res.statusCode = 200;
          res.send(req);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let userReq = req.body.message;

      models.messages.post(userReq, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(201);
          //res.send(req);
        }
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      let username = [req.body.username];
      models.users.post(username, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(201);
        }
      })
    }
  }
}

