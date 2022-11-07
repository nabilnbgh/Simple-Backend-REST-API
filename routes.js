const {postBookToDatabase, getAllBook, getBookById} = require('./handlers');
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
        path    : '/books/{id}',
        handler : getBookById
    },
]

module.exports = route; 