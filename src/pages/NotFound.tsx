import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p>Página no encontrada</p>

      <Link to="/resumen">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
