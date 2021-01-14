리퀘스트 중단할 때 사용: abort: https://developer.mozilla.org/ko/docs/Web/API/AbortController/abort

문제에 나올 수 있다. 

```js
var controller = new AbortController();
var signal = controller.signal; //// controller를 하나 만들고 signal

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort(); 
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {signal}).then(function(response) { // fetch할때 signal을 한다.
    ... // 호출했는데 느려서 안올때 취소버튼을 만들고 
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message; // 실패
  })
}
```



만약 token을 로컬 스토리지에서 가져올때 주의할 점은 가져올때 null일 수 있으니 try catch를 해줘야한다.

그리고 예를들어서 상점에 id만 전부다 reponse로 주면 1, 2, 3이런 데이터가 100개 내려오면 100개의 아이디를 4개씩 나눠서 모아서 요청해라 이런 문제가 있다.  그래서 라이브러리 쓸 수 없다 chunk라는 아이를 구현하면 된다.

```js
_.chunk(['a','b','c','d'],2);
// [['a','b'], ['c', 'd']]
```

이렇게 구현해야한다. 

```js
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
}
```

그리고 debounce, throttle 이 중요하다. 

