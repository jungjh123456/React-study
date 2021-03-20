## 리엑트 훅을 자바스크립트로 변환해보기



리엑트를 사용하다 보니 훅은 어떻게 만들어 졌는지 궁금해서 인터넷 검색을 해 보았다.
리엑트 훅은 JS에 클로저를 사용해서 만들었다고 한다.

```js
function useState(initialValue) {
	let _val = initialValue;

	function state() {
		return _val;
	}
	function setState(newVal) {
		_val = newVal;
	}
	return [state, setState];
}

const [state, setState] = useState([]);
console.log(state()); // []

setState([1, 2, 3]);

console.log(state()); // [1,2,3]
```



