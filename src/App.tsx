import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/generic/protectedRoute";
import Login from "./pages/Login";
import Resumen from "./pages/Resumen";
import Movimientos from "./pages/Movimientos";
import Metas from "./pages/Metas";
import Presupuestos from "./pages/Presupuestos";
import Navegacion from "./pages/Navegacion";
import Analisis from "./pages/Analisis";
import ForgotPassword from "./pages/Forgot";
import ResetPassword from "./pages/Reset";
import VerificarEmail from "./pages/Verificar";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Navegacion />}>
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/metas" element={<Metas />} />s
            <Route path="/presupuestos" element={<Presupuestos />} />
            <Route path="/analisis" element={<Analisis />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
