import axios from "axios";
const BOOK_API_URL = 'https://api.marktube.tv/v1/book/';
export default class BookService {
  static async getBooks(token) {
    const response = await axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reverse();
  }
  
  static async getBook(token, bookId) {
    const response = await axios.get(`${BOOK_API_URL}/${bookId}`, 
     {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async addBook(token, book) {
    const response = await axios.post(BOOK_API_URL, book, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
  return response.data;
}
}