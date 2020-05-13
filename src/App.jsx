import React, {useState} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {BookList} from './components/index';
import AppBar from '@material-ui/core/AppBar';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const languages = ['React', 'Vue', 'Angular'];
  const [keyword, setKeyword] = useState('react');
  const [value, setValue] = useState('');

  const handleClick = (keyword) => {
    setKeyword(keyword);
  }

  const handleChange = ((e) => {
    setValue(e.target.value);
  })

  return (
    <BrowserRouter className={classes.root}>
      <CssBaseline/>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <MenuBookIcon className={classes.icon}/>
          <Typography variant="h6" className={classes.title} noWrap>
            Book Lists
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={value}
              onChange={handleChange}
            />
          </div>
          <Link
            to={'/'}
            onClick={() => handleClick('react')}
            className={classes.link}
          >
            <Button variant="outlined" color="primary">React</Button>
          </Link>
          <Link
            to={'/vue'}
            onClick={() => handleClick('vue')}
            color="inherit"
            className={classes.link}
          >
            <Button variant="outlined">Vue</Button>
          </Link>
          <Link
            to={'/angular'}
            onClick={() => handleClick('angular')}
            color="inherit"
            className={classes.link}
          >
            <Button variant="outlined" color="secondary">Angular</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <main>
        <Route
          exact path={'/'}
          render={
            () => <BookList
              language={languages[0]}
              keyword={keyword}
              value={value}
            />
          }
        />
        <Route
          path={'/vue'}
          render={() => <BookList
            language={languages[1]}
            keyword={keyword}
            value={value}
          />}
        />
        <Route
          path={'/angular'}
          render={() => <BookList
            language={languages[2]}
            keyword={keyword}
            value={value}
          />}
        />
      </main>
    </BrowserRouter>
  )
}

export default App;
