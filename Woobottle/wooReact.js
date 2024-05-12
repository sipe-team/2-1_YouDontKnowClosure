const WooReact = (() => {
  let idx = 0;
  let hooks = [];

  const useState = (initialState) => {
    hooks[idx] = hooks[idx] || initialState;
    const currentIndex = idx; // idx를 훅끼리 같이 쓰므로 분리해줘야 함
    const setState = (newState) => {
      hooks[currentIndex] = newState;
    };

    return [hooks[idx++], setState];
  };

  const render = (component) => {
    const Comp = component();
    Comp.render();
    idx = 0; // 이 구문의 실행 순서에 따라 결과가 달라지는데 좀 열받음
    return Comp;
  };

  return { useState, render };
})();

const funcComp = () => {
  const [count, setCount] = WooReact.useState(1);
  const [count2, setCount2] = WooReact.useState(10);

  const updateCount = (newCount) => {
    setCount(newCount);
  };

  const updateCount2 = (newCount) => {
    setCount2(newCount);
  };

  const render = () => {
    console.log("count", count, "count2", count2);
  };

  return {
    render,
    updateCount,
    updateCount2,
  };
};

let App;
App = WooReact.render(funcComp);
App.updateCount(2);
App.updateCount2(20);
App = WooReact.render(funcComp);
App.updateCount(3);
App.updateCount2(30);
App = WooReact.render(funcComp);
