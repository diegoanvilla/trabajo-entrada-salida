import React, { useState, useContext, useEffect } from "react";

const MemoriaContext = React.createContext();
export function useMemoria() {
  return useContext(MemoriaContext);
}
function MemoryContext({ children }) {
  const initialArray = [
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
    {
      ocupado: 0,
      proceso: "",
    },
  ];
  const [espacio, setEspacio] = useState(initialArray);
  const initialize = () => {
    setEspacio((p) => [...initialArray]);
  };
  return (
    <MemoriaContext.Provider value={{ espacio, setEspacio, initialize }}>
      {children}
    </MemoriaContext.Provider>
  );
}
export default MemoryContext;
