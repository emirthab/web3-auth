import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const cookies = new Cookies()
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if(cookies.get("acc_tkn")){
      setIsLogged(true);
    }
  }, [])
  
  return (
    <GlobalContext.Provider value={{
      isLogged, setIsLogged
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider }