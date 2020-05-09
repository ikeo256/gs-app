import React, {useState} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {BookList} from './components/index';

const App = () => {
  const languages = ['React', 'Vue', 'Angular'];
  const [keyword, setKeyword] = useState('react');

  const handleClick = (keyword) => {
    setKeyword(keyword);
  }

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
            () => <BookList
              language={languages[0]}
              keyword={keyword}
            />
          }
        />
        <Route
          path={'/vue'}
          render={() => <BookList
            language={languages[1]}
            keyword={keyword}
          />}
        />
        <Route
          path={'/angular'}
          render={() => <BookList
            language={languages[2]}
            keyword={keyword}
          />}
        />
      </div>
    </BrowserRouter>
  )
}

export default App;
