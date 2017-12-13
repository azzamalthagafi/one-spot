const spotifyWebAPI = require('spotify-web-api-node');
const client_id = "08d020451ba7408fa630fcfa73326016";
const client_secret = "e4211eff2f01435493f3a684787f74d6";

var spotifyApi = new spotifyWebAPI({
  clientId : client_id,
  clientSecret : client_secret
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
});

var getUser = function (user, cb) {
	spotifyApi.getUser(user).then(function (data) {
		cb(data.display_name);
	});
}

var search = function (query, cb) {
	spotifyApi.searchTracks(query, {limit: 10})
	.then(function(data) {
	  var list = data.body.tracks.items.map((result) => {
	  var artist = result.artists[0].name;
	  if (result.artists.length > 1) {
	    for (var i = 0; i < result.artists.length; i++) {
	      artist += ', ' + result.artists[i].name;
	    }
	  }
	    return {title: result.name,
	            artist: artist, 
	            imgurl: result.album.images[2].url,
	            url: result.external_urls.spotify};
	  });

	  // emit the results
	  cb(list);
	}, function(err) {
	  cb([]);
	});
}

module.exports = { search: search, getUser, getUser};
