import React from 'react';
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";

const  BookItem = React.memo(({title,author,message, url}) => (<div>
  <h2>{title}{' '}
  <a href={url} target="_BLANK" rel="noreferrer">
  <Button icon={<HomeOutlined />} />
  </a>
  </h2>
  <h3>{author}</h3>
  <p>{message}</p>
</div>
));

export default BookItem;