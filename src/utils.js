export function InputText({ id, label }) {
  return (
    <div>
      <label htmlFor={id}>
        <b>{label}:</b>
      </label>
      <input id={id} type="text" />
    </div>
  );
}

export function InputSelect({ id, label, items, selected }) {
  const listItems = items.map(item => (
    <option
      key={item.key}
      selected={selected && selected === item.key ? "selected" : ""}
    >
      {item.value}
    </option>
  ));
  return (
    <div>
      <label htmlFor={id}>
        <b>{label}:</b>
      </label>
      <select id={id}>{listItems}</select>
    </div>
  );
}
