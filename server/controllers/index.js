var models = require('../models');

//controller is the logic and the glue between the model and views so we can call our model to get the data and pass that to the view

module.exports = {
  messages: {
    get: function (req, res) {
        //req includes constraints
      models.messages.get((err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(result);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      const param = [req.body.username, req.body.message, req.body.roomname];

      models.messages.post(param, (err, result) => {
        if (err) {
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(201);
        }
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, result) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      })

    },
    post: function (req, res) {
      res.sendStatus(201);
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

