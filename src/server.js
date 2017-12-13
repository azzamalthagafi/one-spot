import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import _ from 'lodash';
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const Room = require('./Room');
const spotifyApi = require('./spotifyApi');

/******************** EXPRESS SETUP *******************/
// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// middleware usage
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cookieSession({
  name: 'session',
  secret: 'thisisnotsafebutiwilldoitsincethisisalearningproject',

  maxAge: 24 * 60 * 60 * 1000
}));

/******************** EXPRESS ROUTING *******************/
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

/******************** LISTEN & CONNECT TO DB *******************/
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});

/******************** SOCKETIO SETUP *******************/
io.on('connection', (socket) => {
  // socket joins a room
  let id = socket.handshake.query.id;
  socket.join(id);

  // find or create room then send list.
  Room.findOrCreate(id, (err, room) => {
    if (!err) {
      io.in(id).emit('UPDATE_PLAYLIST', room.list);
    }
  });

  // adding a song
  socket.on('ADD_SONG', (obj) => {
    let id = obj.id;
    let song = obj.song;
    Room.addSong(song, id, (err, room) => {
      if (!err) {
        io.in(id).emit('UPDATE_PLAYLIST', room.list);
      }
    });
  });

  // searching for a song
  socket.on('SEARCH', (query) => {
    spotifyApi.search(query, (list) => {
      socket.emit('UPDATE_RESULTS', list);
    });
  });

  // removing a song
  socket.on('REMOVE_SONG', (obj) => {
    let index = obj.index;
    let id = obj.id;
    Room.removeSong(index, id, (err, room) => {
      io.in(id).emit('UPDATE_PLAYLIST', room.list);
    });
  });

  // moving up a song
  socket.on('MOVEUP_SONG', (obj) => {
    let index = obj.index;
    let id = obj.id;
    Room.moveUp(index, id, (err, room) => {
      io.in(id).emit('UPDATE_PLAYLIST', room.list);
    });
  });

  // moving down a song
  socket.on('MOVEDOWN_SONG', (obj) => {
    let index = obj.index;
    let id = obj.id;
    Room.moveDown(index, id, (err, room) => {
      io.in(id).emit('UPDATE_PLAYLIST', room.list);
    });
  });

});
