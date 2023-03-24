import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Header from '../header'
import './App.scss'
import { BookPage, Main } from '../../pages'
import useBookService from '../services/bookService'

function App() {
  const [books, setBooks] = useState([])
  const [params, setParams] = useState('')
  const [offset, setOffset] = useState(0)
  const [newItemLoading, setNewItemLoading] = useState(true)

  const { process, getAllBooks, total } = useBookService()

  useEffect(() => {
    //Чтобы когда каждый раз сохраняешь код, не работал getAllBooks
    if (newItemLoading) {
      onRequest(0, true)
    }
  }, [params])

  const updateBooks = (data, initial) => {
    if (initial) {
      setBooks(data)
      setNewItemLoading(false)
      setOffset(30)
    } else {
      setBooks([...books, ...data])
      setOffset(offset + 30)
    }
  }


  const onRequest = (index, initial) => {
    if (params) {
      getAllBooks(`${params}&startIndex=${index}`)
        .then(response => updateBooks(response, initial))
    } else if (!newItemLoading) {
      console.log('Заполните');
    }
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Header process={process} setNewItemLoading={setNewItemLoading} setParams={setParams} />
        <Routes>
          <Route path='/' element={
            <Main
              total={total}
              newItemLoading={newItemLoading}
              offset={offset}
              onRequest={onRequest}
              process={process}
              books={books} />
          } />
          <Route path='/book/:id' element={
            <BookPage />
          } />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
