import React, { useEffect } from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";

export default function BookList({ books, loading, error, getBooks }) {

  useEffect(() => {
    getBooks();
  }, [getBooks]);

    if (error !== null) {
    const errorType = error.response.data.error; // 찍으면 error객체가 data쪽에 들어있다.
    if (errorType === 'INVALID_TOKEN') {
      return (
        <div>
            <h1>Book List {loading && <LoadingOutlined />}</h1>
            <p>유효하지 않은 토큰 입니다.<Button shape="circle" icon={<ReloadOutlined onClick={getBooks}/>}/></p>
        </div>
      )
    }
    }
 
    return (
      <div>
        <h1>Book List {loading && <LoadingOutlined />}</h1>
        <p>
          <button onClick={getBooks}>reload</button>
          <Link to="/add">Add</Link>
        </p>
        {books && books.length === 0 && <p>데이터가 없습니다.</p>}
        {books && books.length !== 0 && books.map((book) => {
          return <BookItem {...book} key= {book.bookId}/>
        })}
      </div>
    );

}
