var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1234;

// globals
var pg = require('pg');
var config = {
  database: 'taskDB',
  host: 'localhost',
  port: 5432, // always use this port for localhost postgresql
  max: 12
};

var pool = new pg.Pool(config);

// static folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// spin up server
app.listen(port, function() {
  console.log('server up on', port);
});

// base url
app.get('/', function(req, res) {
  console.log('base url hit');
  res.sendFile('index.html');
});

// post to add new task to taskDB
app.post( '/tasks', function( req, res ) {
  console.log( 'post hit to /tasks:', req.body );
  pool.connect( function( err, connection, done ){
    if( err ){
      console.log( err );
      done();
      res.send( 400 );
    } else {
      console.log( 'connected to tasks db from post' );
      connection.query( "INSERT INTO task_table (task) VALUES ( $1 )",
      [ req.body.task ] );
      done();
      res.send( 200 );
    } // end no error
  }); // end pool connect
}); // end /images post

// get to populate task list
app.get('/tasks', function(req, res) {
  console.log('get hit to /tasks');
  pool.connect( function( err, connection, done ) {
    if( err ) {
      console.log( err );
      done();
      res.send( 400 );
    } else {
      console.log( 'connected to tasks DB from get' );
      var taskList = [];
      var resultSet = connection.query( "SELECT * FROM task_table" );
      resultSet.on('row', function(row) {
        taskList.push(row);
      }); //end
      resultSet.on('end', function() {
        done();
        console.log(taskList);
        res.send(taskList);
      });
    } // end no error
  }); // end pool connect
});

// post to delete a task from taskDB
app.post( '/delete', function( req, res ) {
  console.log( 'post hit to /delete:', req.body );
  pool.connect( function( err, connection, done ){
    if( err ){
      console.log( err );
      done();
      res.send( 400 );
    } else {
      console.log( 'connected to tasks db from post' );
      connection.query( "DELETE FROM task_table WHERE task = " + req.body.task + ";");
      done();
      res.send( 200 );
    } // end no error
  }); // end pool connect
}); // end /images post
