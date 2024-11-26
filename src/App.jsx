import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Protected } from "./Auth/Protected";
import { Call } from "./pages/Call";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/call/:type/:id"
          element={
            <Protected>
              <Call />
            </Protected>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
