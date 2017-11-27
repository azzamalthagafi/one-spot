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

export { search, addSong };
