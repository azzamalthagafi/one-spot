import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
var bodyParser = require('body-parser')
var spotifyWebAPI = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/******************** DATABASE SCHEMA *******************/
// define roomSchema
var roomSchema = new Schema({
  id: { type: String, required: true, unique: true },
  list: [ { title: String, artist: String, imgurl: String, url: String } ],
});
var Room = mongoose.model('Room', roomSchema);


/******************** EXPRESS SETUP *******************/
// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

/******************** SPOTIFY API SETUP *******************/
const myid = "08d020451ba7408fa630fcfa73326016";
const mysecret = "e4211eff2f01435493f3a684787f74d6";

var spotifyApi = new spotifyWebAPI({
  clientId : myid,
  clientSecret : mysecret
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    // route '/search' with Spotify
    app.post('/search', (req, res) => {
      let query = req.body.query;

      spotifyApi.searchTracks(query, {limit: 10})
      .then(function(data) {
        res.send(data);
      }, function(err) {
        res.send(err);
      });
    });
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
});



/******************** LISTEN & CONNECT TO DB *******************/
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

mongoose.connect('mongodb://localhost/one-spot');

// start listening once connection is opened
mongoose.connection.on('open', function () {
  /* FOR DEBUGGING
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      console.log(names);
    }
  });
  */

  server.listen(port, err => {
      if (err) {
        return console.error(err);
      }
      console.info(`Server running on http://localhost:${port} [${env}]`);
  });
});

let testroom = new Room( { id: 'test-room', list: [] } );
testroom.save();

/******************** EXPRESS POST ROUTING *******************/
app.post('/addSong', (req, res) => {
  let song = req.body.song;
  let id = req.body.id;
  let room;
  Room.find({id: id}, (err, rooms) => {
    room = rooms[0]; // rooms are unique so there must be a single elt
    room.list.push(song);
    room.save();
  });

  // emit socket event
  io.in(id).emit('Playlist_updated');

  res.send('"' + song.title + '" by "' + song.artist + '" added to room "' + id + '"');
});

app.post('/getPlaylist', (req, res) => {
  let id = req.body.id;
  let list = [];
  Room.find({id: id}, (err, rooms) => {
    if (!rooms.length) { 
      let room = new Room({id: id, list: []});
      room.save();
    } else {
      let room = rooms[0]; // rooms are unique so there must be a single elt
      list = room.list;
    }
    res.send(list);
  });
});


/******************** SOCKETIO SETUP *******************/
io.on('connection', (socket) => {
  // socket joins a room
  let query = socket.handshake.query;
  let id = socket.handshake.query.id;
  console.log(query);
  socket.join(id);
});
