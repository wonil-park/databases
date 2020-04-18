var db = require('../db');

//model is the part that will deal with the database or anay data related functionality

module.exports = {
  messages: {
    get: function (callback) {
      //specify
      // let queryStr = `SELECT messages.id, messages.body, messages.roomname, users.username FROM messages LEFT OUTER JOIN users ON (messages.user_id = users.id)`;
      const queryStr = 'SELECT * FROM messages';

      db.query(queryStr, (err, result) => {
        if(err) {
          console.log(err);
        } else {
          console.log('get results: ', result);
          callback(null, result);
        }
      });
    }, // a function which produces all the messages
    post: function (param, callback) {
      // argument order: username, message roomname
      let queryStr = 'INSERT INTO messages(user_id, body, roomname) VALUES ((SELECT id FROM users WHERE users.username = ?), ?, ?)';
      console.log('queryStr: ', queryStr, 'body: ', param);
      //req includes constraints (username, roomname)
      db.query(queryStr, param, (err, result) => {

        console.log('posted in db: ', result);
        callback(err, result)

      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      let queryStr = 'SELECT * FROM users';
      db.query(queryStr, (err, result) => {
        callback(err, result);
      })
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
  }
};

