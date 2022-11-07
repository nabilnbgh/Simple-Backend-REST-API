const {postBookToDatabase} = require('./handlers');
const route = [
    {
        method  : 'POST',
        path    : '/books',
        handler : postBookToDatabase
    },
]

module.exports = route; 