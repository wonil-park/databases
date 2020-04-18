/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
    });
    dbConnection.connect();

       var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  // it('Should insert posted messages to the DB', function(done) {
  //   // Post the user to the chat server.
  //   request({
  //     method: 'POST',
  //     uri: '/classes/users',
  //     json: { username: 'Valjean' }
  //   },
  //   function () {
  //     // Post a message to the node chat server:
  //     request({
  //       method: 'POST',
  //       uri: '/classes/messages',
  //       json: {
  //         username: 'Valjean',
  //         message: 'In mercy\'s name, three days is all I need.',
  //         roomname: 'Hello'
  //       }
  //     }, function () {
  //       // Now if we look in the database, we should find the
  //       // posted message there.

  //       // TODO: You might have to change this test to get all the data from
  //       // your message table, since this is schema-dependent.
  //         var queryString = 'SELECT * FROM messages';

  //         var queryArgs = [];

  //         dbConnection.query(queryString, function(err, results) {
  //         // Should have one result:

  //         expect(results.length).to.equal(1);

  //         // TODO: If you don't have a column named text, change this test.
  //         expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');


  //         done();
  //       });
  //     });
  //   });
  // });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.

    const queryUser = 'SELECT username FROM users WHERE users.username = (?)';
    const userArgs = [ 'Valjean' ];

    dbConnection.query(queryUser, userArgs, function(err, result) {
      if (err) {
        throw err;
      } else {
        if (result[0].username !== 'Valjean') {
          const insertUser = 'INSERT INTO users(username) VALUE (?)';
          dbConnection.query(insertUser, userArgs, function(err) {
            if (err) { throw err; }
          });
        }
      }
    });

    // Post a message to the node chat server:
    const queryMessage = 'INSERT INTO messages(user_id, body, roomname) VALUES ((SELECT id FROM users WHERE users.username = ?), ?, ?)';;

    const messageArgs = ['Valjean', 'In mercy\'s name, three days is all I need.', 'Hello'];
    dbConnection.query(queryMessage, messageArgs, function(err) {
      if (err) { throw err; }
    });

    // Now if we look in the database, we should find the
    // posted message there.

    // TODO: You might have to change this test to get all the data from
    // your message table, since this is schema-dependent.
    const queryString = 'SELECT body from messages where messages.body = (?)';

    const queryArgs = ['In mercy\'s name, three days is all I need.'];

    dbConnection.query(queryString, queryArgs, function(err, results) {
    // Should have one result:
    expect(results.length).to.equal(1);

    // TODO: If you don't have a column named text, change this test.
    expect(results[0].body).to.equal('In mercy\'s name, three days is all I need.');

    done();
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    const queryString = 'INSERT INTO messages(user_id, body, roomname) VALUES ((SELECT id FROM users WHERE users.username = ?), ?, ?)';

    const queryArgs = ['Valjean', 'Men like you can never change!', 'main'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].body).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});
