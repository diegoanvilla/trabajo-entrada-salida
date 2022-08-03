import React from "react";
import { useMemoria } from "./memoryContext";
function DiagramaMemoria() {
  const { espacio } = useMemoria();
  return (
    <div className="memoria-grid">
      {espacio.map((slot) => {
        return (
          <div className="slot">
            <div className="proceso" style={{ width: `${slot.ocupado}%` }}>
              <p>{slot.proceso}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DiagramaMemoria;
