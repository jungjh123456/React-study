const express = require('express');
const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const app = express();


// 어떤 경로로 요청이 오면 어떤걸 줄거다.

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  const string = ReactDOMServer.renderToString(
    React.createElement('button', null, 'hello')
    );
  const indexPath = path.join(__dirname, 'build', 'index.html');
  const index = fs.readFileSync(indexPath).toString();// string을 뽑아야 한다. 버퍼이다. 그래서 스트링으로 바꿔야한다.
    // index는 index.html(리엑트가 만들어 준거 말고 오기전에 온 html)
    
    // api 호출
    // 그 아이로 renderToString
    // redux store를 만들어준다. initialState에 api 호출해서 나온 결과로
    // 서버에서 만든 initialState를 클라이언트에 보내준다.

    const state = {
      books: [{ name: '책 이름' }]
    }

  res.send(index.replace('<div id="root"></div>', `<div id="root">${string}</div><script>window.__INITIAL_STATE__= JSON.parse('${JSON.stringify(state)}');</script>`));
})
// app.


app.listen(9000);