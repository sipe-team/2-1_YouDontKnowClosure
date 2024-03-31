## useState의 작동방식에 대해서 공부한 내용 기록

### useState 코드

```typescript
function useState(initialValue) {
  var _val = initialiValue;
  function state() {
    return _val;
  }
  function setState(newVal) {
    _val = newVal;
  }
  return [state, setState];
}
```
