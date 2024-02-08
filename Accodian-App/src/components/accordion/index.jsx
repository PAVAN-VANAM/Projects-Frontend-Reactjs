import { useState } from "react";
import data from "./data";
import "./style.css";
export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelect(id) {
    selected !== id ? setSelected(id) : setSelected(null);
  }
  function handleMultiSelect(id) {
    let cpy = [...multiple];
    const findind = cpy.indexOf(id);
    if (findind === -1) cpy.push(id);
    else cpy.splice(findind, 1);

    setMultiple(cpy);
  }
  return (
    <div className="wrapper">
      <button className="btn" onClick={() => setEnableMulti(!enableMulti)}>
        {enableMulti ? <h2>Disable</h2> : <h2>Enable</h2>}To Multi Accordian
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataitem) => (
            <div className="item">
              <div
                onClick={
                  enableMulti
                    ? () => handleMultiSelect(dataitem.id)
                    : () => handleSingleSelect(dataitem.id)
                }
                className="title"
              >
                <h3>{dataitem.question}</h3>
                <span> + </span>
              </div>

              {enableMulti
                ? multiple.indexOf(dataitem.id) !== -1 && (
                    <div className="content">{dataitem.answer}</div>
                  )
                : selected === dataitem.id && (
                    <div className="content">{dataitem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data isfound</div>
        )}
      </div>
    </div>
  );
}
