import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import useStore from "./store/user";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SocketProvider } from "./context/SocketProvider";
import { TaskProvider } from "./context/TaskProvider";
function App() {
  const { isAuth } = useStore();
  console.log('asfd', isAuth);

  return (
    <>
      <div className="flex justify-center bg-white">
        <SocketProvider>
        <TaskProvider>
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Home /> : <Navigate to={"/login"} />}
              />
            <Route
              path="/login"
              element={false ? <Navigate to={"/"} /> : <Login />}
              />
            <Route
              path="/signup"
              element={false ? <Navigate to={"/"} /> : <Signup />}
              />
          </Routes>
              </TaskProvider>
        </SocketProvider>
      </div>
    </>
  );
}

export default App;
