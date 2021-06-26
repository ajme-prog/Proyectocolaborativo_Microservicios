import React, { useContext, useState, useEffect } from "react";

//const grupo1 = "http://35.230.87.64:4091"
const grupo1 = "http://localhost:3001"
const grupo2 = "http://grupo2:4091"
const grupo3 = "http://grupo3:4091"
const grupo4 = "http://grupo4:4091"

const EsbContext = React.createContext();

export function useEsb() {
  return useContext(EsbContext);
}

export function EsbProvider({ children }) {
  
  const [esb, setEsb] = useState();
  
  async function setearESB(esb){
    switch(parseInt(esb)){
      case 1:
        setEsb(grupo1)
        return grupo1
      case 2:
        setEsb(grupo2)
        return grupo2
      case 3:
        setEsb(grupo3)
        return grupo3
      case 4:
        setEsb(grupo4)
        return grupo4
    }
  }

  const value = {
    esb,
    setEsb,
    setearESB
  };

  return (
    <EsbContext.Provider value={value}>
      {children}
    </EsbContext.Provider>
  );
}
