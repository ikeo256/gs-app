import React, {useState, useEffect} from 'react';
import {Loading} from './index';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const BookList = (props) => {
  const classes = useStyles();
  const [bookData, setBookData] = useState({});
  const [firstData, setFirstData] = useState([]);
  const [formatData, setFormatdata] = useState([]);

  // ページ切替
  useEffect(() => {
    (async () => {
      const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
      await axios.get(`${requestUrl}${props.keyword}`)
        .then((response) => {
          setBookData(response);

          // 必要なデータを配列に代入
          if (Object.keys(response).length > 0) {
            const array = [];
            response.data.items.map((value, index) => {
              const thumbnail = (Object.keys(value.volumeInfo).includes('imageLinks'))
                ? value.volumeInfo.imageLinks.thumbnail
                : "";
              const obj = {
                title: value.volumeInfo.title,
                thumbnail: thumbnail,
                infoLink: value.volumeInfo.infoLink
              };
              array.push(obj);
            })

            setFirstData(array);
            setFormatdata(array);
          }
        })
    })();
  }, [props.keyword])

  // 検査
  useEffect(() => {
    let result = [];

    if (Object.keys(bookData).length > 0) {
      const formatArray = [];
      bookData.data.items.map((value, index) => {
        const thumbnail = (Object.keys(value.volumeInfo).includes('imageLinks'))
          ? value.volumeInfo.imageLinks.thumbnail
          : "";
        const obj = {
          title: value.volumeInfo.title,
          thumbnail: thumbnail,
          infoLink: value.volumeInfo.infoLink
        };
        formatArray.push(obj);
      })
      setFormatdata(formatArray);

      // 正規表現であいまい検索
      result = formatArray.filter(object => {
        const reg = new RegExp(props.value, 'i');
        return object.title.match(reg);
      })
    }

    if (props.value === '') {
      setFormatdata(firstData);
    } else {
      setFormatdata(result);
    }
  }, [props.value])

  return (
    <>
      {(Object.keys(bookData).length === 0) ? (
        <Loading/>
      ) : (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={6}>
            {formatData.map((value, index) => (
              <Grid item key={index.toString()} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <a href={value.infoLink} target="_blank" rel="noopener">
                    <CardMedia
                      component="img"
                      title={value.title}
                      src={value.thumbnail}
                      alt={value.title}
                    />
                  </a>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}

export default BookList;