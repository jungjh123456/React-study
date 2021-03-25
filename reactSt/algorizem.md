# 자료구조

## 자료구조의 정의

- 자료 (Data): 현실 세계로 부터 수집한 사실이나 개념의 값 또는 이들의 집합 특정 용도로 사용하기 위해 처리/가공한 것을 정보 이라 한다.
- 자료 구조: 자료구조는 자료값의 모임, 자료 간의 관계 그리고 자료에 적용할 수 있는 함수나 명령을 의미한다.

## 자료구조의 특징

- 효율성: 자료구조는 효율성을 추구한다. 트리 자료구조를 만듬으로써 더 효율적이여야한다. 더 편하게 왔다갔다 할 수 있게(조작이 쉽게)
- 추상화: 추상화는 예를들어 리스트에서 [3,2,6,7,9]라고 자료가 모여 있다고 하면 중간에 6을 삭제하고 싶을때 삭제를하면
  그 결과 [3,2,7,9]이렇게 바꾸고 싶다고 생각한다. 이게 추상화이다. (내부 동작은 [3,2,6,7,9] => 7을 앞으로 땡기고 9를 앞으로 땡겨주고 9를 없애면 실제로 제거가 돼는 것이다.) -> 동작 결과만 알자 이게 추상화 개념이다.
- 재사용성: 자료구조를 만들면 프로그램을 동작을 시키는데 자료구조를 만들어서 집어 넣었을때 다른 프로그래밍에서 사용할 수 없는 자료구조면
  적합하지 않은 자료구조이다. 자료구조는 재사용이 가능해야 한다.

3가지를 충족하려면 특정한 상황에 밖에 쓰인다. 마스터키인 자료구조는 없다. 모든 상황에 효율적일 수는 없고 모든 곳에 재사용을 할 수 가 없다.
적절한 자료구조를 사용해야 한다.

자료구조의 종류

자료구조의 종류는 Data Structure => Linear Structure (선형구조) => Nonlinear Structure (비선형 구조)가 있는데

-> y = f(x) f(ax) = af(x)이면 선형 구조이다.

선형구조는 뭐냐? 말그대로 일자 선형이다. 선형 구조는 자료가 하나 있으면 하나씩 연결되어 있는걸 선형 구조라고 한다.

비선형 구조는 일자로 되어 있지 않고 여러 갈래로 나뉘어져 있는 것을 비선형 구조라고 한다.

선형 구조는 순차 리스트, 연결 리스트, 스택, 큐 가 있고 비선형 구조는 트리, 그래프가 있다.

Sequential List 순서가 있는 의미이다. 그 중에 메모리상에 자료가 연달아 있으면 모아 있는 리스트는 Array List라 부른다.

Linked List는 자료 하나하나 있고 객체가 있고 다음 자료에 있는 참조로 되어 있다.

그리디..?

## 자료구조의 필요성

- 프로그램에서는 다양한 자료를 임시(메모리) / 영구적(파일시스템, 데이터베이스)으로 저장하여 사용한다.
- 만능인 자료구조는 없다. 상황에 따라 적절한 자료구조를 선택하여 사용해야 한다.
- 자료구조의 선택은 프로그램에 다음과 같은 중대한 영향을 끼친다.
  - 필요한 자료에 효율적으로 빠르게 접근할 수 있게 한다.
  - 자료의 중복을 최소화하여 저장장치를 효울적으로 사용할 수 있게 한다.
  - 자료구조 별로 적절한 알고리즘을 기계적으로 적용할 수 있다.
  - 동료들과 협업하는 데에 큰 도움이 된다. (잘못된 창의성을 발휘하지 않게 도와준다.)

누구나 알아볼 수 있는게 좋은 코드이다. !! 자유도가 없을 수록 좋은 거 같다.

## JavaScript와 자료구조

- JavaScript에는 몇가지 자료구조가 Class로 구현되어 있다. Reference를 참고하여 확인해 보자.
  - Array
    - Queue(shift,pop), Stack(push,pop)
  - Map
    - Hash table
  - Set

집합 자료구조

자료구조는 부모와 자식관계로 트리구조로 만들어 준것이다. 트리구조라고 부른다.

자료에 적용할 수 있는 함수나 명령을 의미한다.

## 알고리즘

자료구조를 쓰는 이유는 알고리즘을 사용하기 위해서 이고 알고리즘을 쓰는 것은 자료구조를 적절히
사용해서 적합한 알고리즘을 실제 사용한다.

### 알고리즘이란

문제를 해결하기 위한 여러 동작들의 모임

### 알고리즘 예

실제 좌석에 앉아 있다고 하면

```js
while (notDone) {
	//	1. 맨 뒷 사람을 고른다.
	// 2. 맨 뒤 우측에 있는지 확인한다.
	//	3. 아니라면 맨 뒤 맨 우측으로 민다.
	//	4. 학생에서 제외한다.
}
```

## 알고리즘의 조건

- 입력: 외부에서 제공되는 자료가 존재한다.
- 출력: 적어도 2가지 이상의 다른 결과를 출력해야 한다. 즉, 모든 입력에 대해 동일한 출력을 내서는 안된다.
- 명확성: 수행 과정은 명확한 명령어로 구성되어 있어야 한다.
- 유한성: 유한한 시간 안에 종료되어야 한다. 출력을 얻어내는 데에 무한한 시간이 걸려서는 안된다.
- 효과성: 모든 과정은 사람이 종이와 연필로 유한한 시간 안에 수행할 정도로 단순/명백해야 한다. (표현할 수 있어야 한다.)

## 알고리즘의 필요성

서비스의 규모

- 웹 애플리케이션이 서비스하는 규모는 점점 커지고 있다.
- 십만 명과 백만 건의 Item사이의 관계를 다루려면?
  - 100,000 \* 1,000,000 = 100,000,000,000개(100기가)의 관계를 다뤄야 한다.
  - Naive한 방식으로 이러한 데이터를 실시간으로 다룰 수 없다!

### 컴퓨터의 연산 속도와 비용

    - 최근에는 많은 기업이 클라우드로 서비스를 제공한다.
    	- 수 많은 서버를 물리적으로 구매/유지/관리하는 비용을 아낄 수 있다.
    	- 서버 액세스의 급격한 증가에도 유연하게 대처할 수 있다.
    	- 보안과 안정성 등 소규모 기업이 직접 해결하기 어려운 문제를 쉽게 해결할 수 있다.
    - 연산 = 비용
     	- 클라우드 서버의 비용은 실제로 임대한 서버의 Spec과 시간에 비례한다.
    	- 더 좋은 알고리즘으로 연산 속도를 개선할 경우, 더 낮은 서버 Spec으로도 동일한 서비스를 제공할 수 있다.
    	- 동일한 Batch 작업에 더 좋은 알고리즘을 사용할 경우 동일한 서버 Spec으로 더 짧은 시간 서버를 임대해도 동일한 결과를 얻어낼 수 있다.

### JavaScript와 알고리즘

- JavaScript는 본래 웹 브라우저를 위한 언어로, 알고리즘을 구현하기 위한 메이저한 언어는 아니다.
  - Node.js로 백엔드 구현이 가능해 지면서, 다양한 알고리즘이 구현된 라이브러리가 제공되고 있다.
- 기본적인 자료구조는 구현되어 있으며, 특히 Array, String에 유용한 Method들이 많이 구현되어 있다.
  - 이러한 Method를 잘 활용하는 것이 JavaScript프로그래밍의 핵심이다.
- OOP, FP을 모두 지원한다.
  - 잘 짜여진 자료구조/알고리즘을 구현할 수도 있고, Mission Critical한 로직만 구현할 수도 있다.

### JavaScript에 구현된 알고리즘

- JavaScript의 구현은 브라우저별로 다를 수 있으며, 구체적인 구현은 명세되어 있지 않다.
- JavaScript에 구현된 알고리즘의 예
  - Array
    - sort(정렬-> tim sort Chrome V8), find(조건 탐색), indexOf(Element 탐색), reduce(연쇄 연산)등
  - String
    - match(정규식 매칭), search(검색), split(나누기),slice(가르기), toUpperCase(대문자변환), toLowerCase(소문자변환)등
  - Math
    - max(최대값), min(최소값) 등

## 코딩 테스트

프로그래밍 언어의 기본 라이브러리를 이용한 효율적인 구현

 - 반복문과 조건문을 이용한 기능 구현
   	- Array 검색, 정렬 등의 Method를 이용한 효율적인 구현
   	- 예외 처리를 이용한 모든 Test Case 해결
 - 자료 구조를 이용한 기본 구현
   	- Map, Set, Heap 등 특수한 기능을 갖춘 자료구조 활용
   	- 자료 구조만 잘 선택하면 자연스럽게 풀리는 문제
- 잘 알려진 알고리즘 활용
  - Sort, Dynamic Programming, DFS, BFS, Greedy, Dijkstra...
  - 자료구조와 더불어 알고리즘을 숙지하고 구현해야 해결할 수 있는 문제
- 규격 외의 문제 
  - 위 유형에 속하지 않는 고난이도의 문제는 기업 코딩 테스트에 잘 출제되지 않는다.

## 입력과 출력



```js
function solution(answers) {
	let sp1 = [1, 2, 3, 4, 5];
	let sp2 = [2, 1, 2, 3, 2, 4, 2, 5];
	let sp3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
	let count = [0, 0, 0];
	let result = [];
	answers.forEach((item, i) => {
		if (sp1[i % sp1.length] === item) {
			count[0]++;
		}
		if (sp2[i % sp2.length] === item) {
			count[1]++;
		}
		if (sp3[i % sp3.length] === item) {
			count[2]++;
		}
	});
	count.forEach((item, j) => {
		if (item === Math.max(...count)) {
			result.push(j + 1);
		}
	});
	return result;
}

console.log(solution([1, 3, 2, 4, 2]));
function solution(numbers) {
	var answer = numbers
		.map((c) => c + '')
		.sort((a, b) => {
			console.log('a', a, 'b', b);
			return b + a - (a + b);
		})
		.join('');

	return answer[0] === '0' ? '0' : answer;
}
console.log(solution([6, 10, 2]));
function solution(n, lost, reserve) {
	var answer = 0;
	var people = [];
	people.length = n;
	people.fill(true);
	console.log(people);
	for (let i = 0; i < lost.length; i++) {
		console.log(people);
		people[lost[i] - 1] = false;
	}

	for (let j = 0; j < reserve.length; j++) {
		if (people[j] - 1 === false) {
			people[reserve[j] - 1] = true;
		} else {
			if (people[reserve[j] - 2] === false) {
				people[reserve[j] - 2] = true;
			} else {
				if (people[reserve[j]] === false) {
					people[reserve[j]] = true;
				}
			}
		}
	}
	return people.filter((t) => t).length;
}

function solution(participant, completion) {
	participant.sort();
	completion.sort();
	return participant.find((item, i) => item.indexOf(completion[i]) === -1);
}

console.log(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki']));

function solution(numbers) {
	var answer = [];
	let arr = numbers.sort();

	for (let i = 0; i < numbers.length; i++) {
		for (let j = 0; j < numbers.length; j++) {
			if (i === j) continue;
			answer = [...answer, arr[i] + arr[j]];
		}
	}

	const uniq = new Set(answer);
	answer = [...uniq];
	answer.sort((a, b) => a - b);
	return answer;
}

function solution(a, b) {
	var answer = 0;
	let result = [];
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < b.length; j++) {
			if (i === j) {
				result.push(a[i] * b[j]);
			}
		}
	}
	answer = result.reduce((pre, cur) => pre + cur, 0);
	return answer;
}

function solution(data) {
	const n = data.split(' ');
	const a = Number(n[0]),
		b = Number(n[1]);

	const str = '*';
	for (let i = 0; i < b; i++) {
		console.log(str.repeat(a));
	}
}

function solution(citations) {
	var answer = 0;
	citations.sort((b, a) => a - b);
	console.log(citations);
	for (let i = 0; i < citations.length; i++) {
		if (citations[i] > i) {
			answer++;
		}
	}
	return answer;
}

function solution(number, k) {
	const stack = [];
	var answer = '';

	for (let i = 0; i < number.length; i++) {
		const el = number[i];
		console.log(stack);
		while (k > 0 && stack[stack.length - 1] < el) {
			console.log(stack);
			stack.pop();
			console.log(stack);
			k--;
		}
		stack.push(el);
	}
	stack.splice(stack.length - k, k);
	console.log(stack);
	answer = stack.join('');
	return answer;
}
console.log(solution('1231234', 3));

const Stack = (function () {
	class Stack {
		constructor(array = []) {
			if (!Array.isArray(array)) {
				throw new TypeError(`${array} is not an array`);
			}
			this.array = array;
		}

		push(value) {
			return this.array.push(value);
		}

		pop() {
			return this.array.pop();
		}

		entries() {
			return [...this.array];
		}
	}

	return Stack;
})();

const stack = new Stack([1, 2]);
console.log(stack.entries());

stack.push(3);
console.log(stack.entries());

stack.pop();
console.log(stack.entries());

function solution(number, k) {
	const stack = [];
	var answer = '';

	for (let i = 0; i < number.length; i++) {
		const el = number[i];
		console.log(stack);
		while (k > 0 && stack[stack.length - 1] < el) {
			console.log(stack);
			stack.pop();
			console.log(stack);
			k--;
		}
		stack.push(el);
	}
	stack.splice(stack.length - k, k);
	console.log(stack);
	answer = stack.join('');
	return answer;
}
console.log(solution('1231234', 3));

function solution(n) {
	if (n < 2) return n;

	return (solution(n - 1) + solution(n - 2)) % 1234567;
}

function solution(n) {
	const arr = Array.from({ length: n }, (i) => (i = 0));
	arr[1] = 1;
	arr[2] = 1;
	for (let i = 3; i < n + 1; i++) {
		arr[i] = (arr[i - 1] + arr[i - 2]) % 1234567;
	}

	return arr[n];
}

function solution(w, h) {
	var answer = 1;
	function gcd(w, h) {
		const uclid = w % h;

		if (uclid === 0) {
			return h;
		}
		return gcd(h, uclid);
	}
	const gcdVal = gcd(w, h);
	answer = w * h - (w + h - gcdVal);
	return answer;
}

const solution = (bridgeLength, weight, truckWeights) => {
	const progress = [];
	let i = 1;
	while (true) {
		progress.map((item, j) => {
			if (item.end === i) progress.splice(j, 1);
		});

		if (progress.reduce((p, c) => p + c.weight, 0) + truckWeights[0] <= weight) {
			progress.push({ end: i + bridgeLength, weight: truckWeights.shift() });
		}

		if (!progress.length && !truckWeights.length) break;
		i += 1;
	}

	return i;
};

function solution(numbers, hand) {
	var answer = '';
	return answer;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));

function solution(numbers, hand) {
	var answer = '';
	const left_key = [1, 4, 7];
	const right_key = [3, 6, 9];
	const hand_position = ['*', '#'];
	let result = '';
	const position = {
		1: (0, 0),
		2: (0, 1),
		3: (0, 2),
		4: (1, 0),
		5: (1, 1),
		6: (1, 2),
		7: (2, 0),
		8: (2, 1),
		9: (2, 2),
		'*': (3, 0),
		0: (3, 1),
		'#': (3, 2),
	};
	const getNearHand = (position, l, r, num, hand) => {
		let nearHand = '';
		const left_distance = position[l][0] - position[num][0] + (position[l][1] - position[num][1]);
		const right_distance = position[r][0] - position[num][0] + (position[r][1] - position[num][1]);
		if (left_distance === right_distance) {
			hand === 'left' ? (nearHand = 'L') : (nearHand = 'R');
		} else {
			left_distance < right_distance ? (nearHand = 'L') : (nearHand = 'R');
		}

		return nearHand;
	};
	for (let i = 0; i < numbers.length; i++) {
		if (left_key.includes(numbers[i])) {
			result += 'L';
			hand_position[0] = numbers[i];
		} else if (left_key.includes(numbers[i])) {
			result += 'R';
			hand_position[1] = numbers[i];
		} else {
			const nearHand = getNearHand(position, hand_position[0], hand_position[1], numbers[i], hand);
			if (nearHand === 'L') {
				result += 'L';
				hand_position[0] = numbers[i];
			} else {
				result += 'R';
				hand_position[1] = numbers[i];
			}
		}
	}

	return result;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));

function solution(office, r, c, move) {
	var answer = 0;
	let result = 0;
	const position = {
		1: [0, 0],
		2: [0, 1],
		3: [0, 2],
		4: [1, 0],
		5: [1, 1],
		6: [1, 2],
		7: [2, 0],
		8: [2, 1],
		9: [2, 2],
	};
	const robot_position = [r, c];
	const location = 'n';
	for (let i = 0; i < office.length; i++) {
		for (let k = i; k < office[i].length; k++) {
			if (office[i][k] === -1) {
				return;
			}
		}
		for (let j = 0; j < move.length; j++) {
			if (move[i] === 'go' && location === 'n') {
				robot_position[0] = r - 1;
				result++;
			} else if (move[i] === 'go' && location === 'n') {
				if (robot_position[0] === 0 && robot_position[1] === 0) {
					location = 'E';
					robot_position = [r - 1, c + 1];
				}
			}
		}
	}
	console.log(result);
	return answer;
}

console.log(
	solution(
		[
			[5, -1, 4],
			[6, 3, -1],
			[2, -1, 1],
		],
		1,
		0,
		['go', 'go', 'right', 'go', 'right', 'go', 'left', 'go']
	)
);

function solution(v) {
	var answer = 0;
	let result = [];
	// n 명
	// 1번째 2번째 ...n번째 사람의 키가 주어지면 1번째 사람의 키 - 2번째 사람의 키

	for (let i = 0; i < v.length; i++) {
		let resultArr = [];
		for (let j = 0; j < 2; j++) {
			resultArr.push(Math.abs(v[i] - v[j]));

			result.push(Math.max(...resultArr));
		}
	}
	result.pop();
	const uniq = new Set(result);
	answer = [...uniq];
	console.log(answer);
	return answer.reduce((pre, cur) => pre + cur, 0);
}

console.log(solution([20, 8, 10, 1, 4, 15]));

function solution(n, quests) {
	var answer = [];

	for (let i = 0; i < quests.length; i++) {
		for (let j = 0; j < quests[i].length; j++) {
			answer.push(quests[i][j]);
		}
	}

	console.log(answer);
	return answer;
}

console.log(
	solution(5, [
		[1, 3],
		[1, 4],
		[3, 5],
		[5, 4],
	])
);
```