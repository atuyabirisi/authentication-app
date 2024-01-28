import { useSelector } from "react-redux";
import { RootState } from "../store";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountVerification from "./components/AccountVerification";
import { lazy, Suspense } from "react";
const Signup = lazy(() => import("./components/Signup"));

function App() {
  const { isOpen } = useSelector((state: RootState) => state.toggleSignUp);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isOpen ? (
              <Suspense
                fallback={
                  <div className="vh-100 d-flex align-items-center justify-content-center">
                    <h6>Loading...</h6>
                  </div>
                }
              >
                <Signup />
              </Suspense>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/verification" element={<AccountVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
