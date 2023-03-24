import './header.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'

const Header = ({ setParams, setNewItemLoading }) => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [sorting, setSorting] = useState('relevance')

    const submit = (e) => {
        //Нужно чтобы переходил на главную при нажатии search
        e.preventDefault()

        let query = ''
        if (search) {
            //Если search не пустой то добавить "q=${search}" в query
            query += `q=${search}`
            //Если category не пустой то добавить "+subject:${category}" в query
            query += category && `+subject:${category}`
            //Добавить sorting в query
            query += `&orderBy=${sorting}`
        } else if (category) {
            //Если search пустой а category нет то добавить "q=subject:${category}" в query
            query += `q=subject:${category}`
            //Добавить sorting в query
            query += `&orderBy=${sorting}`
        }

        setNewItemLoading(true)
        setParams(query)
        // setSearch('')
    }
    return (
        <header className="header">
            <div className="container">
                <form onSubmit={(e) => submit(e)}>
                    <div className='header__search'>
                        <input name='text' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Введите название книги' />

                        <button type='submit'>
                            <AiOutlineSearch />
                        </button>
                    </div>

                    <div className="header__selects">
                        <div className="header__selects__category">
                            <select
                                className="form-select"
                                name="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="">all</option>
                                <option value="art">Art</option>
                                <option value="biography">Biography</option>
                                <option value="computers">Computers</option>
                                <option value="history">History</option>
                                <option value="medical">Medical</option>
                                <option value="poetry">Poetry</option>
                            </select>
                        </div>

                        <div className="header__selects__sorting">
                            <select
                                className="form-select"
                                name="sorting"
                                value={sorting}
                                onChange={e => setSorting(e.target.value)}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </header>
    )
}

export default Header