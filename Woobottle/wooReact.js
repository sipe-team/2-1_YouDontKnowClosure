const WooReact = (() => {
  let idx = 0;
  let hookValues = [];

  const useState = (initialState) => {
    hookValues[idx] = hookValues[idx] || initialState;
    const currentIndex = idx; // idx를 훅끼리 같이 쓰므로 분리해줘야 함
    const setState = (newState) => {
      hookValues[currentIndex] = newState;
    };

    return [hookValues[idx++], setState];
  };

  const useEffect = (callback, dependencyArray) => {
    const hasNoDependencyArray = !dependencyArray;
    const currentHooks = hookValues[idx];
    const isDependencyArrayChanged = currentHooks
      ? dependencyArray.some((el, i) => currentHooks[i] !== el)
      : true;

    if (hasNoDependencyArray || isDependencyArrayChanged) {
      callback();
      hookValues[idx] = dependencyArray;
    }
    idx++;
  };

  const render = (component) => {
    const Comp = component();
    Comp.render();
    idx = 0; // 이 구문의 실행 순서에 따라 결과가 달라지는데 좀 열받음
    return Comp;
  };

  return { useState, useEffect, render };
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
    console.log(`count ${count} count2 ${count2}`);
  };

  WooReact.useEffect(() => {
    console.log(`count2 value is changed ${count2}`);
  }, [count2]);

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
