const search = (results) => {
  return {
    type: 'SEARCH',
    results: results
  };
};

const addSong = (song) => {
	return {
		type: 'ADD_SONG',
		song: song
	};
};

const updatePlaylist = (list) => {
	return {
		type: 'UPDATE_PLAYLIST',
		list: list
	};
};

export { search, addSong, updatePlaylist };
