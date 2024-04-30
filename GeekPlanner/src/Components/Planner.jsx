import { useEffect, useState } from "react";
import "./Planner.css";

export function Planner() {
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState(0);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || [] );

  function handleSubmit() {
    setData(()=>[...data, { subject, hour:parseInt(hour)}]);
    
    setSubject("");
    setHour(0);
  }
  function increment(sub) {
    setData(
      data.map((el) => {
        if (el.subject === sub) {
          return { ...el, hour: el.hour + 1 };
        } else {
          return el;
        }
      })
    );
  }
  function decrement(sub) {
    setData(
        data.map((el) => {
          if (el.subject === sub) {
            return { ...el, hour: el.hour - 1 };
          } else {
            return el;
          }
        })
      );
  }
  useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(data));
  },[data])

  return (
    <>
      <div className="text">
        <h2>Geekster Education Planner</h2>
        <div className="inputp">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hour"
            value={hour}
            className="hrs"
            onChange={(e) => setHour(e.target.value)}
          />
          <button onClick={handleSubmit}>ADD</button>
        </div>
        {data.map((el) => (
          <div className="data" key={el.subject}>
             {el.subject} - {el.hour}hour{" "}
            <button className="btn" onClick={() => increment(el.subject)}>+</button>{" "}
            <button className="btn2" onClick={() => decrement(el.subject)}>-</button>
          </div>
        ))}
      </div>
    </>
  );
}
