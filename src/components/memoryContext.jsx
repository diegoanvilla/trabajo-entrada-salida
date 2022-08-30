import React, { useState, useContext, useEffect } from "react";

const MemoriaContext = React.createContext();
export function useMemoria() {
  return useContext(MemoriaContext);
}
function MemoryContext({ children }) {
  const initialArray = [
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
    {
      ocupado: false,
      proceso: "",
    },
  ];
  const [espacio, setEspacio] = useState(initialArray);
  const [procesos, setProcesos] = useState([]);
  const addDispositivo = (dispositivo) => {
    const slot = procesos.length;
    setProcesos((p) => [...p, { dispositivo: "Cargando" }]);

    setTimeout(() => {
      let procesosArray = procesos;
      procesosArray[slot] = { ...dispositivo };
      return setProcesos(procesosArray);
    }, 1000);
  };
  const initialize = () => {
    setEspacio((p) => [...initialArray]);
  };
  useEffect(() => {
    const espacioContainer = espacio;
    for (let index = 0; index < procesos.length; index++) {
      espacioContainer[index] = {
        ocupado: true,
        proceso: procesos[index].velocidad,
        dispositivo: procesos[index].dispositivo,
        estrategia: procesos[index].estrategia,
      };
    }
    setEspacio((e) => [...espacioContainer]);
  }, [procesos]);
  return (
    <MemoriaContext.Provider
      value={{ espacio, setEspacio, initialize, addDispositivo }}
    >
      {children}
    </MemoriaContext.Provider>
  );
}
export default MemoryContext;
