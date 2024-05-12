const WooReact = (() => {
  let _state = [];

  const useState = (initialState) => {
    _state = _state || initialState;

    const setState = (newState) => {
      _state = newState;
    };

    return [_state, setState];
  };

  const render = (component) => {
    const Comp = component();
    Comp.render();
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
