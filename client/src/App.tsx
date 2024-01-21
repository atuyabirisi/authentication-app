import { useSelector } from "react-redux";
import { RootState } from "../store";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const { isOpen } = useSelector((state: RootState) => state.toggleSignUp);
  return <>{isOpen ? <Signup /> : <Login />}</>;
}

export default App;
