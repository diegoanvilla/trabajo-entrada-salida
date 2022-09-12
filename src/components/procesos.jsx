import React from "react";
import { useMemoria } from "./memoryContext";

function Procesos() {
  const { procesos } = useMemoria();
  return (
    <div>
      <h1>Procesos En Cola</h1>
      {procesos && (
        <>
          {procesos.map((p) => {
            return <h4>{p.dispositivo}</h4>;
          })}
        </>
      )}
    </div>
  );
}

export default Procesos;
