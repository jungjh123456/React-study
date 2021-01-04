  import axios from 'axios';
  import React from "react";
  import { sleep } from "../utils";
  import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
  import { Button } from "antd";
  import BookItem from "./BookItem";

  export default class BookList extends React.Component {
    state = {
      books: [],
      loading: false,
      error: null,
    }
    render() {
      const {books, loading, error} = this.state;
      if (error !== null) {
      const errorType = error.response.data.error; // 찍으면 error객체가 data쪽에 들어있다.
      if (errorType === 'INVALID_TOKEN') {
        return (
          <div>
              <h1>Book List {loading && <LoadingOutlined />}</h1>
              <p>유효하지 않은 토큰 입니다.<Button shape="circle" icon={<ReloadOutlined onClick={this.reload}/>}/></p>
          </div>
        )
      }
      }
      console.log(error)
      return (
        <div>
          <h1>Book List {loading && <LoadingOutlined />}</h1>
          {books.length === 0 && <p>데이터가 없습니다.</p>}
          {books.length !== 0 && books.map((book) => {
            return <BookItem {...book} />
          })}
        </div>
      )
    }
    getBooks = async () => {
      try {
        // 서버에 책 리스트 다오.
        this.setState({loading: true});
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          header: {
            Authorization: `Bearer ${this.props.token}`,
          }
        });
        await sleep(2000);
        console.log(response.data);
        
        this.setState({books: response.data, loading: true})
      }catch (error) {
      console.log(error);
      this.setState({loading: false, error})
      }
    }

    async componentDidMount() {
    await this.getBooks();
    }

    reload = async  () => {
      this.setState({error: null})
    await this.getBooks();
    }
  }
