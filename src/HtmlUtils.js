import React from "react";

function useLocalStorage(key, defaultValue = "") {
  const initValue = window.localStorage.getItem(key) || defaultValue;
  const [state, setState] = React.useState(initValue);
  React.useEffect(() => window.localStorage.setItem(key, state), [key, state]);
  return [state, setState];
}

export function HtmlOutput({ id, label, value }) {
  return (
    <div>
      <label htmlFor={id}>
        <strong>{label}:</strong>
      </label>
      <input type="text" id={id} value={value} readOnly />
    </div>
  );
}

export function HtmlText({ id, label, value }) {
  const [stateValue, setStateValue] = useLocalStorage(id);
  const onChange = event => setStateValue(event.target.value);
  return (
    <div>
      <label htmlFor={id}>
        <strong>{label}:</strong>
      </label>
      <input type="text" onChange={onChange} id={id} value={stateValue} />
    </div>
  );
}

export function HtmlSelect({ id, label, items, selected, onSelectedChange }) {
  const [stateValue, setStateValue] = useLocalStorage(id, selected);
  const onChange = event => {
    if (onSelectedChange) onSelectedChange(event);
    setStateValue(event.target.value);
  };

  const options = items.map(item => {
    return <option key={item.key}>{item.value}</option>;
  });

  return (
    <div>
      <label htmlFor={id}>
        <strong>{label}:</strong>
      </label>
      <select onChange={onChange} id={id} value={stateValue}>
        {options}
      </select>
    </div>
  );
}
