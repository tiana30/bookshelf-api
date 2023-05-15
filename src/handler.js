const books = require('./books');

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
      books,
    },
  });

module.exports = {getAllBooksHandler}