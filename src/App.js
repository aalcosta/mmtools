import React from "react";
import metadata from "../data/powers.json";
import "./styles.css";

export default function App() {
  function OutputText({ id, label, value }) {
    return (
      <div>
        <label htmlFor={id}>
          <strong>{label}:</strong>
        </label>
        <input type="text" id={id} value={value} readOnly />
      </div>
    );
  }

  function InputText({ id, label, value }) {
    const storedValue = window.localStorage.getItem(id) || value || "";
    const [stateValue, setStateValue] = React.useState(storedValue);
    React.useEffect(() => window.localStorage.setItem(id, stateValue));

    const onChange = event => setStateValue(event.target.value);
    console.info(stateValue);
    return (
      <div>
        <label htmlFor={id}>
          <strong>{label}:</strong>
        </label>
        <input type="text" onChange={onChange} id={id} value={stateValue} />
      </div>
    );
  }

  function InputSelect({ id, label, items, selected }) {
    const storedValue = window.localStorage.getItem(id) || selected;
    const [value, setValue] = React.useState(storedValue);
    React.useEffect(() => window.localStorage.setItem(id, value));

    const onChange = event => {
      const selectedItem = items.find(elem => elem.key === event.target.value);
      setValue(selectedItem.key);
    };

    const listItems = items.map(item => (
      <option key={item.key}>{item.value}</option>
    ));
    return (
      <div>
        <label htmlFor={id}>
          <strong>{label}:</strong>
        </label>
        <select onChange={onChange} id={id} value={value || ""}>
          {listItems}
        </select>
      </div>
    );
  }

  function MMPowersList() {
    const listItems = metadata.effects.map(item => {
      return {
        key: item.name,
        value: item.name
      };
    });
    return (
      <InputSelect id="mmPowerList" label="Power Effect" items={listItems} />
    );
  }

  function MMPowerStats() {
    const power = metadata.effects[0];
    const powerCost = `${power.powerCost} per RANK`;
    console.log(metadata);
    return (
      <fieldset>
        <OutputText id="mmPowerType" label="Type" value={power.type} />
        <OutputText
          id="mmPowerAction"
          label="Action"
          value={power.activation}
        />
        <OutputText id="mmPowerRange" label="Range" value={power.range} />
        <OutputText
          id="mmPowerDuration"
          label="Duration"
          value={power.duration}
        />
        <OutputText id="mmPowerResist" label="Resistance" value={power.range} />
        <OutputText id="mmPowerCost" label="Cost" value={powerCost} />
      </fieldset>
    );
  }

  function MMForm() {
    return (
      <form>
        <InputText id="mmPowerName" label="Power Name" />
        <hr />
        <MMPowersList />
        <MMPowerStats />
        <hr />
      </form>
    );
  }

  return (
    <div className="App">
      <h1>Mutants & Mastermids Power Builder</h1>
      <MMForm />
    </div>
  );
}
