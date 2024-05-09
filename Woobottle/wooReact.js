const WooReact = (() => {
  let _state;
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

  const updateCount = (newCount) => {
    setCount(newCount);
  };

  const render = () => {
    console.log("hihi", count);
  };

  return {
    render,
    updateCount,
  };
};

let App;
App = WooReact.render(funcComp);
App.updateCount(2);
App = WooReact.render(funcComp);
App.updateCount(3);
App = WooReact.render(funcComp);
