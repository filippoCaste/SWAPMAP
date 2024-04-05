import React, { createContext, useState, useContext } from 'react';

// Creazione del context
const AppContext = createContext();

// Hook personalizzato per utilizzare il context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Provider del context
export const AppProvider = ({ children }) => {
  const [back, setBack] = useState(false);
  const [backModal, setBackModal] = useState(false);

  return (
    <AppContext.Provider value={{ back, setBack, backModal, setBackModal }}>
      {children}
    </AppContext.Provider>
  );
};
