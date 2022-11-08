const { nanoid } = require('nanoid');
const database = require('./database');
const postBookToDatabase = (request, h) => {
    const {name, pageCount, readPage} = request.payload;
    if(name === null || name.length == 0 || name === undefined){
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
    const {bookId} = request.params;
    const book = database.find((book) => book.id === bookId);
    if(book === undefined ){
        const res = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        res.code(404);  
        return res;
    }
    const res = h.response({
        status  : 'success',
        data    : {
            book
        },
    });
    res.code(200);
    return res;
}

const putBookById = (request, h) => {
    const {bookId} = request.params;
    const index = database.findIndex((book) => book.id === bookId);
    const {name, readPage, pageCount} = request.payload;
    if(index == -1){
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        res.code(404);  
        return res;
    }
    if(name === undefined || name.length == 0 || name === null){
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        res.code(404);  
        return res; 
    }
    if(parseInt(readPage) > parseInt(pageCount)){
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        res.code(404);  
        return res; 
    }
    if(updateBookObject(request.payload, index)){
        const res = h.response({
            status  : 'success',
            message : 'Buku berhasil diperbaru',
        });
        res.code(200);
        return res;
    }

}

function updateBookObject(request,index){
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
    const currentBook = database.at(index);
    currentBook.name = name;
    currentBook.year = year;
    currentBook.author = author;
    currentBook.summary = summary;
    currentBook.publisher = publisher;
    currentBook.pageCount = pageCount;
    currentBook.readPage = readPage;
    currentBook.reading = reading;
    currentBook.insertedAt = new Date().toISOString();

    return true;
}

const deleteBookById = (request, h) => {
    const {bookId} = request.params;
    const index = database.findIndex((book) => book.id === bookId);
    if(index == -1){
        const res = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        res.code(404);  
        return res;
    }
    database.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
}
module.exports = {postBookToDatabase, getAllBook, getBookById ,putBookById, deleteBookById};