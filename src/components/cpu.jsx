import React from "react";
import { useMemoria } from "./memoryContext";
function Cpu() {
  const { cpu } = useMemoria();
  return (
    <div className="cpu">
      <div className="proceso">
        <div className="loader" style={{ width: `${cpu.progress}%` }}></div>
        <h3>{cpu.trabajando ? cpu.title : "Esperando Conexion"}</h3>
        <p>{cpu.interrupted ? cpu.interrupted : ""}</p>
      </div>
    </div>
  );
}

export default Cpu;
