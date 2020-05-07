import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {Booklist} from './components/index';

const App = () => {
  const languages = ['React', 'Vue', 'Angular'];
  const [keyword, setKeyword] = useState('react');
  const [bookData, setBookData] = useState(null);

  const handleClick = (keyword) => {
    setKeyword(keyword);
  }

  useEffect(() => {
    (async () => {
      const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
      await axios.get(`${requestUrl}${keyword}`)
        .then((response) => {
          setBookData(response);
        })
        .catch((error) => {
          console.log(error);
        })
    })();
  }, [keyword])

  return (
    <BrowserRouter>
      <div>
        <h1>react app</h1>
        <ul>
          <li><Link to={'/'} onClick={() => handleClick('react')}>React</Link></li>
          <li><Link to={'/vue'} onClick={() => handleClick('vue')}>Vue</Link></li>
          <li><Link to={'/angular'} onClick={() => handleClick('angular')}>Angular</Link></li>
        </ul>
        <Route
          exact path={'/'}
          render={
            () => <Booklist
              language={languages[0]}
              bookData={bookData}
            />
          }
        />
        <Route
          path={'/vue'}
          render={() => <Booklist
            language={languages[1]}
            bookData={bookData}
          />}
        />
        <Route
          path={'/angular'}
          render={() => <Booklist
            language={languages[2]}
            bookData={bookData}
          />}
        />
      </div>
    </BrowserRouter>
  )
}

export default App;
