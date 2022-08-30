import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import FragmentacionInterna from "./components/Salida";
import FragmentacionExterna from "./components/Entrada";
import DiagramaMemoria from "./components/DiagramaMemoria";
import { useMemoria } from "./components/memoryContext";
function App() {
  const { initialize } = useMemoria();
  const [estrategia, setEstrategia] = useState(false);
  return (
    <div className="App">
      <h1 className="text-center">Trabajo Entrada/Salida</h1>
      <h4 className="text-center">Diego Castillo</h4>
      <h4 className="text-center">CI: 28211064</h4>

      <div className="container">
        <div className="input-section">
          <div className="toggle-strategy">
            <a onClick={() => setEstrategia(false)}>Salida</a>
            <a onClick={() => setEstrategia(true)}>Entrada</a>
          </div>
          {estrategia ? <FragmentacionExterna /> : <FragmentacionInterna />}
        </div>
        <div className="input-section">
          <h1>Conectados</h1>
          <DiagramaMemoria></DiagramaMemoria>
        </div>
      </div>
    </div>
  );
}

export default App;
