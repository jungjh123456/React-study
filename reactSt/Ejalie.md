# 에자일 방법론

- 스크럼 방법
- Sprint 방법
- 마일스톤 방법



## 스크럼 방법

스크럼은 애자일 소프트웨어 개발 방법론중 하나이다. 

반복적이고 점진적인 개발 방법을 말한다. 전통적인 소프트웨어 모델과 달리 각 반복 주기가 종료될때마다 부분적으로 완성된 결과물이 만들어진다.



애자일에서는 반복 주기를 이터레이션(iteration 반복)이라고 하지만 스크럽에서는 반복 주기를 스프린트라고 하며 주로 1 ~ 4주로 구성된다.

## 스크럼 3가지 역할

스크럽에는 제품 책임자, 스크럼 마스터 그리고 개발팀이라는 3가지 역할이 있다. 이것을 합쳐서 스크럼 팀이라고 부른다.

1. 제품 책임자

- 제품 백로그를 관리 작성하고 이해관리자로부터 요구사항을 추출하여 제품 백로그에 반역한다. 
- 요구사항에 우선 순위를 매기고 각 스프린트마다 우선순위를 관리 조정한다.

2. 스크럼 마스터

- 일반적인 프로젝트 관리자들과는 다르게 개발 팀원들을 코칭하고 개발팀이 프로젝트 진행중 문제가 생겼을때 잘 해결할 수 있도록 도와주는 역할을 한다.

개발 팀원들이나 스크럼에 참여하는 사람들이 스크럼을 제대로 알고 수해ㅇ하고 있는지에 대한 책임을 가지며 스크럼의 이론 규칙들을 잘 따르도록 보장해야한다.

3. 개발팀

- 고객으로부터 받은 요구사항을 가지고 제품을 개발, 테스트 하는 팀으로 주로 5 ~ 7명으로 이루어진다.
- 개발팀에는 따로 리더가 정해져 있지 않으며 팀원들이 자기 조직화되어 있어 외부의 명령없이 스스로 스프린트 목표를 달성하기 위해 최상의 방법을 결정한다.

## 스크럼 진행 과정

1. 제품 백로그 작성

제품 책임자가 사용자 스토리를 기반으로 제품 백로그를 작성한다.

제품 백로그는 이해관계자로부터 추출된 제품이 제공해야하는 기능이나 개발할 제품에 대한 요구하항 목록을 말한다. 

사용자 스토리란 고객이나 개발자가 모두 이해할 수 있도록 고객이 작성하는 것이고 사용자 스토리는 카드, 대화, 테스트 라는 세 측면을 이용하여 작성한다.



### 카드 

- 고객의 요구사항을 문서화하기 보다는 표현하기 위한 것으로 대화의 매개체 역할을 한다.

- 나는 ~ 로써 ~ 하기위해 ~ 하고 싶다 라는 카드를 작성하며 who, why, what 정보가 모두 포함되어 있어야한다.

### 대화

대화는 카드 내용의 세부하항을 구체화시킴으로서 인수기준이 정해지고 이해의 공유를 촉진 시킨다.



### 테스트

대화에서 논의한 인수 기준을 통해 스토리의 완료 여부를 판단한다. 

인수 기준이 만족되었는지 여부를 확인하기 위해 긍정적인 테스트와 부정적인 테스트를 모두 사용해야 한다.



## 스프린트 계획 회의

스프린트 계획 회의는 스프린트 계획1 스프린트 계획 2로 나뉘고 계획 1에서는 스프린트 동안 무엇을 할지 우선순위가 높은 아이템들을 검토하고 스프린트 목표를 정하고 파트2에서는 스프린트 계획 파트1에서 결정한 무엇을 어떻게 실행할 지에 대해 정한다.



스프린트 계획 회의가 끝날 때 쯤에 개발팀은 각 스프린트가 끝날 때마다 어떻 결과물을 내놓을 것인지에 대한 현실적인 목표를 정하는데 이것을 스프린트 약속이라고 한다.



즉 우리가 하는 프로젝트에 스프린트 계획 파트1에서 1주일동안 해야할 목표 

컴포넌트 쪼개기, 컴포넌트 스타일링 을 목표로 두었다면 스프렌트 2에서 어떻게 실행할 건지 정한다.  

그리고 마지막으로 스프린트 백로그를 작성

제품 백로그에서 결정된 우선순위를 기반으로 스프린트 동안 해야하는 일에 대한 리스트를 스프린트 백로그 라고 한다. 

스프린트 목표를 구현 가능하도록 각각의 요구사항을 task 단위로 나누어 개발자들이 나눠서 작업을 수행한다.





## 일일스크럼 미팅

일일스크럼 미팅은 개발원들이 늘어지는 것을 방지하기 위해 스탠드업 미팅 형식으로 진행

매일 정해진 시간에 정해진 장소에 모여 15분~20분 동안 간단하고 빠르게 진행

어제 했던 일과 오늘 할 일 수행중 문제점이나 장애요인 등을 공유하며 문제가 있을 경우 미팅 후 바로 해결한다. 

일일 스크럼 미팅을 함으로서 프로젝트 후반부에 문제점이 갑자기 발생하는 것을 예방한다.

매일 개발 팀원들은 스프린트 백로그에 있는 현재 작업을 완료하기 위해 작업이 얼마나 남았는지 번다운 차트를 통해 진척도를 추적한다.



> 번다운 차트는 소멸 차트라고도 부르며 한 스프린트 동안 남아있는 작업량을 보여주는 그래프를 말한다.

## 스프린트 리뷰

스프린트가 종료되었을 때 개발팀이 스프린트동안 개발한 증분의 기능을 히해관리자들에게 보여주고 피드백을 받는 과정을 말한다.

고객은 자신이 요청한 요구사항이 해당 스프린트 동안 제품이 잘 반영되었는지 평가한 후 피드백을 하면 프로덕트 오너는 고객의 피드백이나 여러 사항들을 정리하여 다음 스프린트에 반영되도록 제품 백로그를 다시 갱신한다. 

스프린트의 한 주당 스프린트 리뷰시간은 한시간으로 제약되어 있고 리뷰를 준비하는데 30분을 넘지 않도록 해야한다.

## 스프린트 회고 

스프린트 리뷰 후 프로젝트를 진행하면서 좋았던점 문제점 미진한 점을 도출함으로 써 다음 스프린트를 보다 더 나은 방향으로 개성할 수 있도록 하는 과정을 말한다.

스프린트 회고 과정에서 스크럼 마스터는 중재 및 조정 역할을 하는 퍼실리데이터역할을 할 수 있다.

스프린트 회고과정을 통해 이미 정해진 프로세스로만 프로젝트를 수행하는 것이 아니라 프로세스가 끊임없이 개선되도록 하여 변화하고 있는 환경에 더 능동적으로 적응할 수 있도록 한다.



## 다음 스프린트 시작

스프린트는 제품 책임자가 제품을 출시할 준비가 되었다고 판단할 때까지 계속된다. 

스프린트가 회고 후 휴식 기간없이 다음 스프린트를 진행한다.





## 에자일 방법의 목표

지속적이고 측정하기 쉬운 프로세스를 통해 목표를 달성

계속 집중하고 프로젝트 진화의 모든 단계를 테스트 하고 필요한 경우 변경을 수행하는 것



제일 처음 나온게 Lean 방법이다. Lean 프로젝트는 애자일 개념을 실행에 통합하면 매우 효과적이라는 것이 밝혀졌다. 린은 광잉이나 낭비 없이 애자일 방법론이 제안하는 모든 것을 충족하는 린을 의미한다. 

스크럼의 주요 특징

1. 다 분야 팀 구성
2. 팀으로 일하기
3. 수행해야하는 작업 목록 만들기 - 현제 기획단계에서 우리가 만들고 있는 엑셀 자료
4. 정기적이로 일상적인 피드백 루틴 채택 - 일일 스크럼 미팅
5. 완료시간을 결정하여 작업의 스프린트를 구성 

이걸 반복한다. 



## 마일스톤

마일 스톤이란 단게의 완료나 중요 산출물의 완료 의사결정 시점등 프로젝트 일정상 중요한 시점을 나타낸다.



프로젝트에서 특기할만한 분기점

예를 들어 프로젝트 계약 착수 중간보고 감리 종료 자금 수령 등

어느 한 작업 혹은 프로젝트를 끝내기 위해 거쳐야 하는 특기점을 표현할 때 마일 스톤 이라고 한다. 





## 스프린트가 잘 안되는 이유



스프린트를 회고하다 보면 최초 추정이 잘 안되어서 실제로 업무를 끝내는데 시간이 오래 걸렸다. 

그래서 끝내기로 했던 작업을 많이 못 끝냈다. 

그래서 야근을 했다. 

하지만 결국 못 끝냈다.



등등의 내용을 많이 듣게 되는데요 

지금 남기는 글이 정답은 아니지만 왜 이러한 결과가 나왔는지 생각해보면 최초에 추정이 제대로 안되었기 때문이다. 

그래서 추정을 하기 위한 노오오오오오력이 필요하다.

스프린트 추정 실패 알고리즘

1. 어차피 지금 추정해도 하다 보면 안 맞는다.
2. 그래서 추정을 대충하게 된다.
3. 대충 추정하면 스프린트 회고에서 추정한 내용이 안 맞는다로 연결된다.
4. 그러면 다시 대충 추정하게 된다.
5. 1 ~ 4번 반복하면 스프린트 방법론에 대해 신뢰하지 않게 되고
6. 그러면 스프린트는 우리팀하고 안 맞는거 같다면서 예전에 하던대로 한다.

스프린트를 실행하려면 이 방법론에 대한 **신뢰** 가 있어야 한다. 만약 일단 해보자 이런 마음이 없으면 잘 안될 가능성이 더 높다 왜냐 잘 되는데까지는 시간이 엄청 걸린다.

추정 : 자료가 불완전하거나 불확실하더라도 사용할 수 있는 계산된 결과의 근사값이다.

bottom up 에자일



위에 목표가 있으면 돌아 task 를 토데로 

## 그럼 어떻게 해야 추정을 잘 할 수 있을까?

1. 해당 스토리/태스크를 하려면 무엇을 해야하는지 모르는 경우

예를 들어 이러한 스토리가 있다고 생각해보자.

운영자는 데이터를 다운로드 받을 수 있다.



스토리를 조금 더 구체적으로 쓸 수 있다.

운영자는 다운로드 버튼을 클릭하여 조회목록의 데이터를 다운로드 받을 수 있다.

그런데 스토리를 조금 더 자세하게 쓰면 구체적으로 해야 할 것이 정해질 수가 있다. 이 스토리 하나만으로는 추정이 진짜 어렵다. 그래서 스토리를 소개해야하는데 이때 프로토타입과 기획서가 필요하다. 프로토타입은 최종 산출물을 상상하는데 도움이 되고 기획서는 최종 산출물에 다가가기 위해서 필요한 정보를 확인하는데 도움이 된다. 



그래서 PM은 스토리를 잘 소개해야 한다. 예를들어 운영자는 (다운로드 버튼을 클릭 하여) 조회 목록의 데이터를 다운로드 받을 수 있다. 라는 스토리를 진행하기 위해서는

1. 프론트 작업 - 다운로드 버튼 생성 (위치, 색상)

2. 프론트 작업 - 다운로드 로딩 중 화면 표시 (더블 클릭 방지, 다운로드 완료까지 다른 작업을 못하도록 로딩 화면 표시)
3. 다운로드 형식 결정 - Excel로 받을 건지 CSV로 받을 건지 결정
4. 제약사항 확인 - 최대 다운로드 row는 몇 개까지인지

최소한 이정도 스토리 소개(프로토타입과 기획서)가 있어야 이 스토리 태스크를 끝내려면 무엇을 해야하는지 파악할 수 있고 이 때 스크럼팀 내에서도 어떤 작업이 필요한 파악할 수 있다. 



## 나(팀)의 업무 속도를 모르는 경우

이 경우는 스스로 업무를 하면서 나의 업무 시간을 돌이켜 볼 필요가 있다. 어떤 포지션의 역할을 수행하는 사람이든지 필요한 역량이라고 생각한다. 경력있는 PM, 개발자, 디자이너 등등 어떤 포지션이든 OO업무를 수행할 때 자신이 업무를 수행했을 때 OO 정도 걸리겠다 를 예측할 수 없다는 것은 경력보다 경험이 없다는 것을 의미일 수도 있고 경험을 쌓을 때 생각보다 무관심 했었을 수도 있다. 

그러면 경험도 충분히 있고 유사한 경험에 대한 감도 있다고 해서 추정이 잘 될 수 있을까 사실 그럼에도 불구하고 팀의 속도를 추정하는 것은 여전히 힘들다 그 이유는 아직 안해봤기 때문이고 그래서 처음에는 추정과 실제 사이에 차이가 발생하는 것이 당연하다. 하지만 처음에는 알수 없지만 두 번째 이 후 부터는 조금씩 되어 간다는 느낌을 갖는 것이 중요하다. 



그러다 보면 점점 팀의 추정이 실제와 어느 정도 일치하게 되고 이러면 예측 가능성을 확보하게 된다. 사실 추정한다는 것은 정말 어려운 일이다. 하지만 그렇다고 해서 이 추정 작업을 포기하면 스프린트가 잘 될 가능성이 매우 어렵다. 스프린트가 성공했을 때 추정이 잘 안된 경우는 없기 때문이다. 즉 추정 작업의 성공이 스프린트 성공을 보장하지 않지만 성공한 스프린트는 항상 성공적인 추정 과정이 있었다는 점이다. (추정 과정의 성공이 추정과 실제가 항상 일치하는 것을 의미하는 것은 아니다.)