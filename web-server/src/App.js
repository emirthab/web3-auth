import Home from "./components/pages/Home"
import Register from "./components/register"
import Layout from "./components/Layout";
import Login from "./components/Login"
import Oops from "./components/Oops"
import { RegisterContextProvider } from "./components/contexts/RegisterContext";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={
          <RegisterContextProvider>
            <Register />
          </RegisterContextProvider>
        } />
        <Route path="/oops" element={<Oops />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
