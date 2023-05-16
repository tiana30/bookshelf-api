const { nanoid } = require('nanoid');
const books = require('./books');

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
      books: allBooks,
    },
  });

  const addBookHandler = (request, h) => {
    const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading, 
    body} = request.payload;

    const id = nanoid(16);
    const isFinish = readPage === pageCount;
    const finished = isFinish; 
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading, 
        body, 
        insertedAt, 
        updatedAt,
    };

    if (!name) {
       const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } 

    if (readPage > pageCount) {
       const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    if (!books.some(book => book.id === id)) {
      books.push(newBook);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }

      const response = h.response({
        status: 'fail',
        message: 'Book failed to add',
      });
      response.code(500);
      return response;
};

module.exports = {getAllBooksHandler,
addBookHandler}