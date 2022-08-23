import { createContext, useState } from "react";

const RegisterContext = createContext();

const RegisterContextProvider = ({ children }) => {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [checked, setChecked] = useState(false)

  return (
    <RegisterContext.Provider value={{
      step, setStep,
      username, setUsername,
      email, setEmail,
      checked, setChecked
    }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterContextProvider }