import React from "react";
import { useMemoria } from "./memoryContext";
function DiagramaMemoria() {
  const { espacio } = useMemoria();
  return (
    <div className="memoria-grid">
      {espacio.map((slot) => {
        return (
          <div className="slot">
            <div
              className="proceso"
              style={{ width: `${slot.ocupado ? "100" : "0"}%` }}
            >
              <h3>{slot.dispositivo}</h3>
              <p>
                <b>{slot.proceso && `velocidad: ${slot.proceso}`}</b>
              </p>
              <small>
                {slot.proceso &&
                  `Estrrategia Almacenamiento: ${slot.estrategia}`}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DiagramaMemoria;
