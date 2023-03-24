import { useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../spinner'
import skeletonBook from './../../assets/img/1616987662_5-p-fon-dlya-oblozhki-knigi-7.jpg'
import './booksList.scss'

const BooksList = ({ books, process, onRequest, offset, newItemLoading, total }) => {
    const [activeAuthors, setActiveAuthors] = useState(false)

    const View = () => {
        const items = books.map((book, i) => {
            const img = book.thumbnail ? book.thumbnail.thumbnail : skeletonBook

            return (
                <Link to={`/book/${book.id}`} key={i} className='booksList__items__item'>
                    <div className='booksList__items__item-img'>
                        <img src={img} alt='' />
                    </div>
                    <div className='booksList__items__item-name'>
                        {book.title.length > 30 ? `${book.title.slice(0, 30)}...` : book.title}
                    </div>
                    {book.categories &&
                        <div className='booksList__items__item-category'>
                            Category: <span>{book.categories[0]}</span>
                        </div>
                    }

                    {book.authors &&
                        <div onClick={() => setActiveAuthors(!activeAuthors)} className='booksList__items__item-authors'>
                            Authors: <span>{book.authors.length > 2 ? book.authors.slice(0, 2).join(', ') + '...' : book.authors}</span>
                        </div>
                    }
                </Link>
            )
        })

        return (
            <section className='booksList'>
                <h3 className="booksList__total">
                    Found {total} results
                </h3>
                <div className="booksList__items">
                    {items}
                </div>
                {process === 'loading' ?
                    <div className='loading'>
                        <Spinner />
                    </div>
                    : <h3 onClick={() => onRequest(offset, false)} className='booksList__more'>
                        Load More
                    </h3>
                }
            </section>
        )
    }
    //https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyABtYcTkKtvhNVEnZBDQXTf0vuKX8sI4JQ
    return (
        <div className='container'>
            {
                process === 'loading' && newItemLoading ?
                    <div className='loading'>
                        <Spinner />
                    </div>
                    : books.length > 0 ? <View /> : <h2>Пока нет книг...</h2>
            }



        </div>
    )
}

export default BooksList