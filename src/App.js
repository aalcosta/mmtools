import metadata from "../data/powers.json";
import "./styles.css";

import React from "react";
import { HtmlOutput, HtmlSelect, HtmlText } from "./HtmlUtils.js";

export default function App() {
  function lookupEffect(sourceEffect) {
    return metadata.effects.find(effect => effect.name === sourceEffect);
  }

  function MMPowerStats({ sourceEffect }) {
    const power = lookupEffect(sourceEffect);

    if (!power) {
      return <fieldset />;
    }

    const powerCost = `${power.cost.points} per RANK`;
    return (
      <fieldset>
        <HtmlOutput id="mmPowerType" label="Type" value={power.type} />
        <HtmlOutput
          id="mmPowerAction"
          label="Action"
          value={power.activation}
        />
        <HtmlOutput id="mmPowerRange" label="Range" value={power.range} />
        <HtmlOutput
          id="mmPowerDuration"
          label="Duration"
          value={power.duration}
        />
        <HtmlOutput
          id="mmPowerResist"
          label="Resistance"
          value={power.resistance}
        />
        <HtmlOutput id="mmPowerCost" label="Cost" value={powerCost} />
      </fieldset>
    );
  }

  function MMForm() {
    const baseEffects = metadata.effects.map(effect => {
      return {
        key: effect.name,
        value: effect.name
      };
    });

    const [sourceEffectName, setSourceEffectName] = React.useState(
      metadata.effects[0].name
    );
    const onSourceEffectChange = event =>
      setSourceEffectName(event.target.value);

    const [finalCost, setFinalCost] = React.useState({
      perRank: 0,
      flat: 0
    });

    return (
      <form>
        <HtmlText id="mmPowerName" label="Power Name" />
        <hr />
        <HtmlSelect
          id="mmPowerBaseEffect"
          label="Base Effect"
          items={baseEffects}
          selected={sourceEffectName}
          onSelectedChange={onSourceEffectChange}
        />
        <MMPowerStats sourceEffect={sourceEffectName} />
        <hr />
        <HtmlOutput id="mmPowerCost" label="Final Cost" value="finalCost" />
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
