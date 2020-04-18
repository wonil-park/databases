DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  body VARCHAR(200) NOT NULL,
  roomname VARCHAR(20),

  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- CREATE TABLE users (
--   id INT NOT NULL AUTO_INCREMENT,
--   username VARCHAR(25) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE rooms (
--   id INT NOT NULL AUTO_INCREMENT,
--   roomname VARCHAR(25) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE messages (
--   id INT NOT NULL AUTO_INCREMENT,
--   body TEXT,
--   user_id INT,
--   room_id INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (user_id)
--       REFERENCES users(id),
--   FOREIGN KEY (room_id)
--       REFERENCES rooms(id)
-- );

/* join_table of user & room

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

