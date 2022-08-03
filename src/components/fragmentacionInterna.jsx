import React, { useRef, useEffect, useState } from "react";
import { useMemoria } from "./memoryContext";
function FragmentacionInterna() {
  const { espacio, setEspacio } = useMemoria();
  const kb = useRef();
  const [procesos, setProcesos] = useState([]);
  const addProcess = (kb) => {
    if (procesos.length === 8 || kb > 1000) return alert("No hay espacio");
    return setProcesos((p) => [...p, { espacio: kb }]);
  };
  useEffect(() => {
    const espacioContainer = espacio;
    for (let index = 0; index < procesos.length; index++) {
      espacioContainer[index] = {
        ocupado: procesos[index].espacio / 10,
        proceso: `${index + 1}`,
      };
    }
    setEspacio((e) => [...espacioContainer]);
  }, [procesos]);
  return (
    <div>
      <h1 className="titulo">Fragmentacion Interna</h1>
      <h3 className="titulo">Añadir nuevo proceso</h3>
      <input
        type="number"
        name=""
        placeholder="espacio de tu proceso en kb"
        id=""
        ref={kb}
      />
      <button onClick={() => addProcess(kb.current.value)}>Añadir</button>
    </div>
  );
}

export default FragmentacionInterna;
