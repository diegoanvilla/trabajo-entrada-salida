import React, { useState, useContext, useEffect, useRef } from "react";

const MemoriaContext = React.createContext();
export function useMemoria() {
  return useContext(MemoriaContext);
}
function MemoryContext({ children }) {
  const initialArray = [
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
    {
      reservado: false,
      ocupado: 0,
    },
  ];
  const [cpu, setCpu] = useState({ trabajando: false, progress: 0 });
  const [espacio, setEspacio] = useState(initialArray);
  const [procesos, setProcesos] = useState([]);
  const [cpuInterval, setCpuInterval] = useState(null);

  const savedCallback = useRef();

  const setCpuProcess = (dispositivo, interrupted) => {
    setCpu({
      trabajando: true,
      progress: 100,
      title: `Procesando Conexion a ${dispositivo}`,
      interrupted: interrupted && "Interrumpido",
    });
  };

  const interval = () => {
    if (procesos.length) {
      try {
        setCpuProcess(
          procesos[0].dispositivo,
          procesos[0].estrategia === "Interrupcion"
        );
        let espacioArray = espacio;
        espacioArray[procesos[0].slot] = {
          dispositivo: procesos[0].dispositivo,
          velocidad: procesos[0].velocidad,
          estrategia: procesos[0].estrategia,
          listo: true,
        };
        let processes = procesos;
        processes.shift();
        setProcesos(processes);
        console.log(procesos.length);
        setEspacio(espacioArray);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCpu({
        trabajando: false,
        progress: 0,
        title: ``,
        interrupted: "",
      });
    }
  };

  const getFreeSpacePosition = () => {
    for (let index = 0; index < espacio.length; index++) {
      if (espacio[index].reservado === false) {
        console.log(index);
        return index;
      }
    }
    return undefined;
  };

  const addDispositivo = (dispositivo) => {
    const slot = getFreeSpacePosition();
    if (slot === undefined) return alert("No hay espacios disponibles");
    const espacioArray = espacio;
    espacioArray[slot] = {
      dispositivo: "conectando...",
      tiempo: dispositivo.tiempo,
    };
    setEspacio((e) => [...espacioArray]);
    setTimeout(() => {
      let p = procesos;
      if (dispositivo.estrategia === "Interrupcion") {
        console.log(procesos.length);
      }
      dispositivo.estrategia === "Interrupcion"
        ? p.unshift({ ...dispositivo, listo: false, slot: slot })
        : p.push({ ...dispositivo, listo: false, slot: slot });
      setProcesos((process) => [...p]);
    }, dispositivo.tiempo * 100);
  };

  const initialize = () => {
    setEspacio((p) => [...initialArray]);
  };

  useEffect(() => {
    savedCallback.current = interval;
  }, [interval]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    const app = () => {
      setCpuInterval(setInterval(tick, 2000));
      return () => clearInterval(cpuInterval);
    };
    return app;
  }, []);

  return (
    <MemoriaContext.Provider
      value={{ espacio, setEspacio, initialize, addDispositivo, cpu, procesos }}
    >
      {children}
    </MemoriaContext.Provider>
  );
}
export default MemoryContext;
