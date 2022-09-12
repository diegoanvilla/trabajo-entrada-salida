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
  const [pausedInterval, setPausedInterval] = useState();

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
    if (!pausedInterval) {
      if (procesos.length) {
        try {
          setCpuProcess(procesos[0].dispositivo);
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
    } else {
      setCpuProcess(pausedInterval.dispositivo, true);
      let espacioArray = espacio;
      espacioArray[pausedInterval.slot] = {
        dispositivo: pausedInterval.dispositivo,
        velocidad: pausedInterval.velocidad,
        estrategia: pausedInterval.estrategia,
        listo: true,
      };
      setEspacio(espacioArray);

      setPausedInterval();
    }
  };

  const getFreeSpacePosition = () => {
    for (let index = 0; index < espacio.length; index++) {
      if (espacio[index].reservado === false) {
        return index;
      }
    }
  };

  const addDispositivo = (dispositivo) => {
    const slot = getFreeSpacePosition();

    const espacioArray = espacio;
    espacioArray[slot] = {
      dispositivo: "conectando...",
      tiempo: dispositivo.tiempo,
    };
    setEspacio((e) => [...espacioArray]);
    setTimeout(() => {
      let p = procesos;
      p.push({ ...dispositivo, listo: false, slot: slot });
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

  useEffect(() => {
    if (
      procesos.length &&
      procesos[procesos.length - 1].estrategia === "Interrupcion"
    ) {
      setPausedInterval(procesos[procesos.length - 1]);
      let processes = procesos;
      processes.pop();
      setProcesos((p) => [...processes]);
    }
  }, [procesos]);

  return (
    <MemoriaContext.Provider
      value={{ espacio, setEspacio, initialize, addDispositivo, cpu, procesos }}
    >
      {children}
    </MemoriaContext.Provider>
  );
}
export default MemoryContext;
