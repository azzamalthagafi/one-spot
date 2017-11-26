import _ from 'lodash';

const mainReducer = (state, action) => {
  switch (action.type) {

  case 'SEARCH': {

    let results = [{title: "did it work", artist: "probably not"}];
    return {results: results};
  }

  }
  return state;
};

export { mainReducer };
