import React, { useRef, useEffect, useState } from "react";
import { useMemoria } from "./memoryContext";
function FragmentacionExterna() {
  const { espacio, setEspacio } = useMemoria();
  const kb = useRef();
  const [procesos, setProcesos] = useState([]);
  const addProcess = (kb) => {
    if (procesos.length === 8 || kb > 8000) return alert("No hay espacio");
    return setProcesos((p) => [...p, { espacio: kb }]);
  };
  useEffect(() => {
    if (!procesos.length) return;
    const espacioContainer = espacio;
    try {
      let procesoEspacio = procesos[procesos.length - 1].espacio;
      while (procesoEspacio > 0) {
        for (let y = 0; y < espacio.length; y++) {
          if (espacio[y].ocupado === 0) {
            if (procesoEspacio > 1000) {
              espacioContainer[y] = {
                ocupado: 100,
                proceso: `${procesos.length}`,
              };
              procesoEspacio = procesoEspacio - 1000;
            } else {
              espacioContainer[y] = {
                ocupado: procesoEspacio / 10,
                proceso: `${procesos.length}`,
              };
              procesoEspacio = 0;
              break;
            }
          }
          console.log(procesoEspacio > 0);
          if (y === espacio.length - 1 && procesoEspacio > 0) {
            setProcesos((p) =>
              p.filter((item, i) => i !== procesos.length - 1)
            );
            throw "No hay espacio";
          }
        }
      }
      setEspacio((e) => [...espacioContainer]);
    } catch (err) {
      console.log(procesos);
      alert(err);
    }
  }, [procesos]);
  return (
    <div>
      <h1 className="titulo">Fragmentacion Externa</h1>
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

export default FragmentacionExterna;
