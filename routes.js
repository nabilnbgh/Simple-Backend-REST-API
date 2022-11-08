const {postBookToDatabase, getAllBook, getBookById, putBookById, deleteBookById} = require('./handlers');
const route = [
    {
        method  : 'POST',
        path    : '/books',
        handler : postBookToDatabase
    },
    {
        method  : 'GET',
        path    : '/books',
        handler : getAllBook
    },
    {
        method  : 'GET',
        path    : '/books/{bookId}',
        handler : getBookById
    },
    {
        method  : 'PUT',
        path    : '/books/{bookId}',
        handler : putBookById
    },
    {
        method  : 'DELETE',
        path    : '/books/{bookId}',
        handler : deleteBookById
    },
]

module.exports = route; 