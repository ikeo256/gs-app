import React from 'react';

const BookList = (props) => {
    return (
        <div>
          <ul>
            {(props.bookData === null)
              ? <p>now loading...</p>
              : props.bookData.data.items.map((value, index) => {
                return <li key={index.toString()}>{value.volumeInfo.title}</li>
              })
            }
          </ul>
        </div>
    )
}

export default BookList;