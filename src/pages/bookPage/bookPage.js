import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useBookService from '../../components/services/bookService';
import { MdOutlineArrowBackIos } from 'react-icons/md'
import './bookPage.scss'

import skeletonBook from './../../assets/img/1616987662_5-p-fon-dlya-oblozhki-knigi-7.jpg'
import Spinner from '../../components/spinner';

const BookPage = () => {
    const [book, setBook] = useState(null)
    const { id } = useParams();
    const { process, getBook } = useBookService()

    useEffect(() => {
        getBook(id)
            .then(response => setBook(response))
    }, [])
    let description = ''
    let img = ''
    if (book) {
        if (book.thumbnail) {
            if (book.thumbnail.medium) {
                img = book.thumbnail.medium
            } else {
                img = book.thumbnail.thumbnail
            }
        } else {
            img = skeletonBook
        }

        if (book.description) {
            description = book.description.replaceAll('<p>', '').replaceAll('</p>', '')
        }
    }
    const error = process === 'error' && book ? <h3>Что-то пошло не так...</h3> : null
    return (
        <>
            {error}
            {process === 'loading' ? <div ><Spinner /></div>
                : book && <div className="container">
                    <div className='bookPage__back'>
                        <Link to='/'>
                            <MdOutlineArrowBackIos /> <h3>На главную</h3>
                        </Link>
                    </div>
                    <div className="bookPage">
                        <div className="bookPage__img">
                            <img src={img} alt="" />
                        </div>
                        <div className="bookPage__main">
                            <h2 className="bookPage__main-title">{book.title}</h2>

                            {book.authors &&
                                <div className="bookPage__main-authors">
                                    <span>Authors: </span>{book.authors.join(', ')}
                                </div>
                            }
                            {book.categories &&
                                <div className="bookPage__main-authors">
                                    <span>Category:</span> {book.categories.join(', ')}
                                </div>
                            }
                            {description &&
                                <div className="bookPage__main-description">
                                    <span>Description</span>:
                                    <p>
                                        {description}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BookPage