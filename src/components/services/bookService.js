import { useCallback, useState } from "react";
import { useHttp } from "../../hooks/http.hook";


const useBookService = () => {
    const [total, setTotal] = useState(0)
    const { process, setProcess, request, clearError, } = useHttp()

    const __apiKey = 'key=AIzaSyA9ESmiBbNEK5a7Xmg485w2GgUIcwQwcDo'
    const __apiBase = 'https://www.googleapis.com/books/v1/volumes'
    const maxResults = 30

    const getAllBooks = async (params) => {
        const res = await request(`${__apiBase}?${params}&maxResults=${maxResults}&${__apiKey}`)
        setTotal(res.totalItems);
        return res.items.map(_transformBook)
    }

    const getBook = async (id) => {
        const res = await request(`${__apiBase}/${id}?${__apiKey}`)

        return _transformBook(res)
    }

    const _transformBook = (book) => {
        const test = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks
        }
        return test
    }


    return {
        process,
        setProcess,
        clearError,
        getAllBooks,
        getBook,
        total
    }
}

export default useBookService