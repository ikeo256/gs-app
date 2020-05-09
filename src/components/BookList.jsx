import React, {useState, useEffect} from 'react';
import axios from "axios";

const BookList = (props) => {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        (async () => {
            const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
            await axios.get(`${requestUrl}${props.keyword}`)
                .then((response) => {
                    setBookData(response);
                })
        })();
    }, [props.keyword])

    return (
        <div>
            <ul>
                {(bookData === null)
                    ? <p>now loading...</p>
                    : bookData.data.items.map((value, index) => {
                        return <li key={index.toString()}>{value.volumeInfo.title}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default BookList;