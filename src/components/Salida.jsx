import React, { useRef, useEffect, useState } from "react";
import { useMemoria } from "./memoryContext";
function FragmentacionInterna() {
  const salida = [
    {
      dispositivo: "Pantalla",
      velocidad: "2KBs",
      estrategia: "Programada",
      tiempo: 23,
    },
    {
      dispositivo: "Impresora",
      velocidad: "1 - 5 Kbs",
      estrategia: "Interrupcion",
      tiempo: 40,
    },
    {
      dispositivo: "Linea de comunicaciones",
      velocidad: "30Bps - 20MBps",
      estrategia: "Interrupcion",
      tiempo: 50,
    },
  ];
  const { espacio, setEspacio, addDispositivo } = useMemoria();
  return (
    <div>
      <h1 className="titulo">Dispositivos de Salida:</h1>
      {salida.map((i) => {
        return (
          <>
            <div className="element">
              <h1>{i.dispositivo}</h1>
              <button
                onClick={() => {
                  addDispositivo(i);
                }}
              >
                Conectar
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default FragmentacionInterna;
