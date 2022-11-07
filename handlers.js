const { nanoid } = require('nanoid');
const database = require('./database');
const postBookToDatabase = (request, h) => {
    const {name, pageCount, readPage} = request.payload;
    if(name === null || toString(name).length === 0 || name === undefined){
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        res.code(400);
        return res;

    }else if(parseInt(readPage) > parseInt(pageCount)){
        const res = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        res.code(400);
        return res;
    }
    else{
        const newBookObject = createNewBookObject(request.payload);
        database.push(newBookObject);
        const isSuccess = database.filter((book) => book.id === newBookObject.id).length > 0;

        if (isSuccess) {
            const res = h.response({
                status  : "success",
                message : "Buku berhasil ditambahkan",
                data    : {
                    bookId  : newBookObject.id,
                },
            });
            res.code(201);
            return res;
        }
        else{
            const res = h.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
            });
            res.code(500);
            return res;
        }  
    }   
    
}

function createNewBookObject(request){
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request;
    const id = nanoid(16);
    const finished = (pageCount === readPage) ? true : false;
    
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    return {
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
        insertedAt,
        updatedAt
    };
}

const getAllBook = (_,h) => {
    const response = h.response({
        status : "success",
        data   :  {database},
    });
    response.code(200);
    return response;
}

const getBookById = (request, h) => {
    const {id} = request.params;
    const index = database.indexOf((book) => book.id === id);

    if(index === undefined){
        const res = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        res.code(404);  
        return res;
    }
    const book = database.at(index);
    const res = h.response({
        status  : 'success',
        data    : {
            book
        },
    });
    res.code(200);
    return res;

}
module.exports = {postBookToDatabase, getAllBook, getBookById};