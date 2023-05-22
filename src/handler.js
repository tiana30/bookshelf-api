const { nanoid } = require('nanoid');
const books = require('./books');

  const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading, body} = request.payload;

    const id = nanoid(16);
    const isFinished = readPage === pageCount;
    const finished = isFinished ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, body, insertedAt, updatedAt,
    };

    if (name === undefined) {
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

    const existingBook = books.findIndex((book) => book.id === id);
if (existingBook === -1) {
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
} else {
  const response = h.response({
    status: 'fail',
    message: 'Buku sudah ada',
  });
  response.code(400);
  return response;
}

};

const getAllBooksHandler = () => ({
  
  status: 'success',
  data: {
    books:books.map(book => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});


const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  
  const book = books.find((book) => book.id === id);

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  else{
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
}
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading,
        updatedAt,
      };

      if (name === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
      } 
      
      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
      }

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
  }
  
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = books.findIndex((book) => book.id === id);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}

module.exports = {getAllBooksHandler,
addBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler}