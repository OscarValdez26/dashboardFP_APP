import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { apiRequest } from "@/api/api";
import { useState } from "react";

function VerificarEmailCard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const validar = async () => {
    const resultado = await apiRequest("POST", "usuarios/verificar-email", {
      token: token,
    });
    if (resultado.success) {
      alert("Email verificado, gracias");
      navigate("/login");
    } else {
      setMensaje(resultado.data.message);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="mb-4">
        <CardTitle>Verificar email</CardTitle>
        <CardDescription>
          Click para validar que el correo electrónico es correcto{" "}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-center items-center h-50">
        <Button onClick={validar}>Verificar</Button>
        <p className="text-red-500 font-medium pt-4">{mensaje}</p>
      </CardContent>
    </Card>
  );
}

export default VerificarEmailCard;
