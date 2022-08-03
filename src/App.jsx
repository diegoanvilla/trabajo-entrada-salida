import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import FragmentacionInterna from "./components/fragmentacionInterna";
import FragmentacionExterna from "./components/fragmentacionExterna";
import DiagramaMemoria from "./components/DiagramaMemoria";
import { useMemoria } from "./components/memoryContext";
function App() {
  const { initialize } = useMemoria();
  const [estrategia, setEstrategia] = useState(false);
  useEffect(() => {
    initialize();
  }, [estrategia]);
  return (
    <div className="App">
      <h1 className="text-center">Trabajo Software de memoria</h1>
      <h4 className="text-center">Diego Castillo</h4>
      <h4 className="text-center">CI: 28211064</h4>

      <div className="container">
        <div className="input-section">
          <div className="toggle-strategy">
            <a onClick={() => setEstrategia(false)}>Fragemntacion Interna</a>
            <a onClick={() => setEstrategia(true)}>Fragmentacion externa</a>
            <a>Paginacion segmentacion</a>
            <a>Paginacion segmentada</a>
            <a>Particiones Estaticas</a>
          </div>
          <small>Memoria es de 8mb</small>
          {estrategia ? <FragmentacionExterna /> : <FragmentacionInterna />}
        </div>
        <div className="input-section">
          <h1>Memoria</h1>
          <DiagramaMemoria></DiagramaMemoria>
        </div>
      </div>
    </div>
  );
}

export default App;
