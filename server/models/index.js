var db = require('../db');

//model is the part that will deal with the database or anay data related functionality

module.exports = {
  messages: {
    get: function (callback) {
      //specify
      let queryStr = 'SELECT * FROM messages';
      // where optional! room_id = req.room_id'
      let queryStrArgs = [];

      db.query(queryStr, queryStrArgs, (err, result) => {
        if(err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    }, // a function which produces all the messages
    post: function (body, callback) {

      let queryStr = `INSERT INTO messages(body) VALUE (?)`;
      console.log('queryStr: ', queryStr, 'body: ', body);
      //req includes constraints (username, roomname)
      db.query(queryStr, body, (err, result) => {
        if (err) {
          callback(err);
        } else {
          console.log('posted in db: ', result);
          callback(null, result);
        }
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },

    post: function (userName, callback) {
      let queryStr = `INSERT INTO users(username) VALUE (?)`;
      db.query(queryStr, userName, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      })
    }
  },

  rooms: {

  }
};

