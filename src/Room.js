var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/one-spot');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  id: { type: String, required: true, unique: true },
  list: [ { title: String, artist: String, imgurl: String, url: String } ],
});

// finds or creates a room.
roomSchema.statics.findOrCreate = function(id, cb) {
  var self = this; 
  this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err) }
    if (!room) { 
      var room = new self({ id: id });
      room.save(cb);
    }
    if (room) {
      cb(null, room);
    }
  });
}

// adds a song to a room with a specific id.
roomSchema.statics.addSong = function(song, id, cb) {
  this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err); }
    room.list.push(song);
    room.save(cb);
  });
}

// removes a song at a specific index. Invalid id's are ignored.
roomSchema.statics.removeSong = function(index, id, cb) {
  this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err); }
    room.list = room.list.filter( (song, i) => { return i !== index });
    room.save(cb);
  });
}

// moves a song higher up the list. Invalid moves are ignored.
roomSchema.statics.moveUp = function(index, id, cb) {
  this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err); }
    if (index > 0) {
			var tmp = room.list[index - 1];
	    room.list.set(index - 1, room.list[index]);
	    room.list.set(index, tmp);
	  }
	  room.save(cb);
  });
}

// moves a song lower down the list.
roomSchema.statics.moveDown = function(index, id, cb) {
  this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err); }
    if (index < room.list.length - 1) {
			var tmp = room.list[index + 1];
	    room.list.set(index + 1, room.list[index]);
	    room.list.set(index, tmp);
	  }
	  room.save(cb);
  });
}

roomSchema.statics.getList = function (id, cb) {
	this.findOne({ id: id }, function (err, room) {
    if (err) { cb(err); }
    return room.list;
  });
}

module.exports = mongoose.model('Room', roomSchema);