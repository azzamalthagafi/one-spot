import _ from 'lodash';

const mainReducer = (state, action) => {
  switch (action.type) {

  case 'SEARCH': {
    return _.assign({}, state, {results: action.results});
  }

  case 'ADD_SONG': {
  	let list = state.list;
  	list[list.length] = action.song;
    return _.assign({}, state, {list: list});
  }

  case 'UPDATE_PLAYLIST': {
    return _.assign({}, state, {list: action.list});
  }

  }
  return state;
};

export { mainReducer };
