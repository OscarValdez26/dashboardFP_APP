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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "@/api/api";
import { useAuthContext } from "@/context/useAuthContext";
import { setAccessToken } from "@/api/auth";

const registerSchema = z
  .object({
    nombre: z.string().min(3, "Minimo 3 catacteres").max(50),
    apellidos: z.string().min(3, "Minimo 3 caracteres").max(50),
    email: z.email("Email invalido"),
    password: z.string().min(8, "Minimo 8 caracteres"),
    passwordConf: z.string().min(8, "Minimo 8 caracteres"),
  })
  .refine((data) => data.password === data.passwordConf, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConf"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function FormularioRegistro() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      passwordConf: "",
    },
  });
  const onSubmit = async (data: RegisterForm) => {
    const respuesta = await apiRequest("POST", "usuarios/register", data);
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
    navigate("/login");
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="mb-4">
        <CardTitle>Registro de usuario</CardTitle>
        <CardDescription>Crear cuenta nueva </CardDescription>
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
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Nombre(s)</FieldLabel>
                    <Input
                      {...register("nombre")}
                      placeholder="Nombre o nombres"
                      required
                    />
                    <FieldDescription></FieldDescription>
                    <FieldError>{errors.nombre?.message}</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel>Apellidos</FieldLabel>
                    <Input
                      {...register("apellidos")}
                      placeholder="Apellidos"
                      required
                    />
                    <FieldDescription></FieldDescription>
                    <FieldError>{errors.apellidos?.message}</FieldError>
                  </Field>
                </div>
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
                </Field>
                <Field>
                  <FieldLabel>Confirmar contraseña</FieldLabel>
                  <Input
                    {...register("passwordConf")}
                    type="password"
                    placeholder="Por favor repetir contraseña"
                    required
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.passwordConf?.message}</FieldError>
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
          className="w-full mb-4 hover:cursor-pointer"
        >
          Registrarse
        </Button>
        <Label>¿Ya tienes una cuenta?</Label>
        <Button
          variant="outline"
          className="w-full hover:cursor-pointer"
          onClick={changePage}
        >
          Iniciar sesion
        </Button>
      </CardFooter>
    </Card>
  );
}
