# closure (js vs. swift)

> 결국, 비슷하다.. 다만 swift 에서는  capture 방식이 다르기 때문에, 더욱더 메모리 관리에 신경 써야한다.

## js 에서 closure

### 🍪 ydkjy 읽고 아티클 읽고 결국 한줄로 정리하면,,
 함수가 정의된 환경을 기억하고, 그 환경에 있는 변수들에 접근할 수 있게 해준다. 

### 🍪 `useEffect` 이나 `useCallback` 을 썼을때 dependency array
closure를 이해하니 lint 가 왜 자꾸 dependency array에 외부 값들을 다 넣으라고 에러를 뱉는지 알 수 있다.
closure는 함수가 생성될 때마다 함수가 생성되는 시점에 생성되고 이때  capture를 한다.
따라서, dep arr에 넣어주면서 closure가 스냅샷을 했던 값을 업데이트 해주는거겠구나 싶다.

closure trap 이든,  stale closure 든 dependency array 에 잘 넣어주지 않아서 생기는 문제라 생각한다. 
(lint 말을 잘 듣자..)

## swift 에서 closure

### 🍪 람다 함수(익명함수) + `@escaping`
swift에서 closure는 익명함수라고도 한다. 즉 이름이 없는 함수다. 사실 함수도 closure라고 한다.(이름이 있는 클로저)
closure 는 그 자체가 1급 객체라, 매개변ㄴ수, 반환값으로 다 지정이 가능하다.
`@escaping` 이라는 키워드가 있는데 이걸 사용하면, 함수 인자로 전달된 closure가 함수 밖에서 실행이 된다. (return 후 실행) (여기서 싸악 감이올겁니다.. 맞아요.. 비동기에서 많이 쓰입니다)

### 🍪 Strong Reference Cycle (강한 순환 참조) 와 closure
swift 는 ARC가 메모리 관리를 어느정도 해준다.(gc같은거) ARC가 참조 횟수를 추적하며 더 이상 참조하는 곳이 없으면 자동으로 메모리 해제를 해주지만,
`Reference counting`이 0이 되지 않아 메모리에서 해제되지 않고 계속 남아있는 경우를 강한 순환 참조라고 한다. (이는 곧 memory leak..)
(더 자세한  arc 작동 원리는 나중에 물어본다면 알려드립니다. 너무 주제랑 벗어나기 때문에  pass)

무튼, swift에선 value/reference type 상관없이 클로저는 reference capture를 하고  이때 기본적으로 "strong"으로 캡쳐를 한다. 따라서, class의 instance의 rc (reference count)가 증가한다. 
여기서 문제는   `self`를 통해  instance property에 접근할때,  instance는 closure를 참조, closure는 instance를 참조하다 보니 둘다 메모리에서 해제가  되지 않는 이슈가 있다. 이게 바로 강한 순환참조..
이걸 해결하고자  `weak`, `unowned`, `capture list` 를 사용해 `[weak self]` 를 사용해  rc를 증가시키는 않는 이런 방식으로 이슈를 해결한다. 

## 회고
적다보니 swift가 길어진건... 기분탓일것이다. 
농담이고, 사실 swift로 먼저 잡은  closure 개념이라, js랑 싱크를 맞추는게 꽤 어려웠다. (물론 지금도..다 완벽히 안다고 할 수 었을 거 같다)
그래도 아무 의심 없이 쓰고 있던  hook 에 대해 다시 생각해본 거에 큰 의미를 두려 한다.


