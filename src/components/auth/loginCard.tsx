import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/api/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuthContext } from "@/context/useAuthContext";
import { setAccessToken } from "@/api/auth";

const registerSchema = z.object({
  email: z.email("Email invalido"),
  password: z.string().min(8, "Minimo 8 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function FormularioLogin() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: RegisterForm) => {
    const respuesta = await apiRequest("POST", "usuarios/login", data);
    if (respuesta.success) {
      setAccessToken(respuesta.data.accessToken);
      setUser(respuesta.data.usuario);
      localStorage.setItem("user", JSON.stringify(respuesta.data.usuario));
      navigate("/resumen");
    } else {
      setError(respuesta.data.message);
    }
  };

  const changePage = () => {
    navigate("/registro");
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="mb-4">
        <CardTitle>Iniciar Sesion</CardTitle>
        <CardDescription>
          Inicia sesion con una cuenta existente
        </CardDescription>
        {/* <CardAction>
          <CardDescription>Si ya tienes una cuenta</CardDescription>
          <Button variant="link">Iniciar sesion</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              {/* <FieldLegend>Formulario de registro</FieldLegend> */}
              {/* <FieldDescription>Formulario de registro</FieldDescription> */}
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...register("email")}
                    placeholder="email@ejemplo.com"
                    required
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel>Contraseña</FieldLabel>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Por lo menos 8 caracteres"
                    required
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.password?.message}</FieldError>
                  {error && <FieldError>{error}</FieldError>}
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="formulario"
          className="w-full hover:cursor-pointer"
        >
          Iniciar sesion
        </Button>
        <Label className="mb-4">
          ¿Olvidaste tu contraseña?
          <a className="underline" href="/forgot-password">
            Click aqui
          </a>
        </Label>
        <Label>¿No tienes una cuenta?</Label>
        <Button
          variant="outline"
          className="w-full hover:cursor-pointer"
          onClick={changePage}
        >
          Registrarse
        </Button>
      </CardFooter>
    </Card>
  );
}
