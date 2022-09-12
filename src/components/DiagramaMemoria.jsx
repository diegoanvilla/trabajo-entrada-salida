import React, { useState, useEffect, useRef } from "react";
import { useMemoria } from "./memoryContext";
function DiagramaMemoria() {
  const { espacio } = useMemoria();
  return (
    <div className="memoria-grid">
      {espacio.map((slot) => {
        return (
          <div className="slot">
            <div className="proceso">
              <Loader load={slot.tiempo} />
              <h3>{slot.dispositivo}</h3>
              <p>
                <b>{slot.listo && `velocidad: ${slot.velocidad}`}</b>
              </p>
              <small>
                {slot.listo && `Estrrategia Almacenamiento: ${slot.estrategia}`}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
const Loader = ({ load }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (load) {
      let time = 0;
      const interval = setInterval(() => {
        setProgress(time);
        time++;
        if (time === 101) {
          clearInterval(interval);
        }
      }, load);
    }
  }, load);
  return <div className="loader" style={{ width: `${progress}%` }}></div>;
};
export default DiagramaMemoria;
