const search = (query) => {
  return {
    type: 'SEARCH',
    query: query
  };
};

export { search };
