import { useSelector } from "react-redux";
import { RootState } from "../store";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountVerification from "./components/AccountVerification";

function App() {
  const { isOpen } = useSelector((state: RootState) => state.toggleSignUp);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isOpen ? <Signup /> : <Login />} />
        <Route path="/verification" element={<AccountVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
