import React, { useRef, useEffect, useState } from "react";
import { useMemoria } from "./memoryContext";
function FragmentacionExterna() {
  const entrada = [
    { dispositivo: "Teclado", velocidad: "10 Bps", estrategia: "programada" },
    {
      dispositivo: "Mouse",
      velocidad: "1Bps - 1Kbs",
      estrategia: "programada",
    },
    { dispositivo: "microfono", velocidad: "64Kbs", estrategia: "programada" },
  ];
  const { espacio, setEspacio, addDispositivo } = useMemoria();
  return (
    <div>
      <h1 className="titulo">Dispositivos de entrada:</h1>
      {entrada.map((i) => {
        return (
          <>
            <div className="element">
              <h1>{i.dispositivo}</h1>
              <button onClick={() => addDispositivo(i)}>Conectar</button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default FragmentacionExterna;
