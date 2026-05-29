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
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/api/api";
import { useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";

const registerSchema = z
  .object({
    password: z.string().min(8, "Minimo 8 caracteres"),
    passwordConf: z.string().min(8, "Minimo 8 caracteres"),
  })
  .refine((data) => data.password === data.passwordConf, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConf"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function ResetPasswordCard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: "",
      passwordConf: "",
    },
  });
  const onSubmit = async (data: RegisterForm) => {
    const json = {
      token: token,
      password: data.password,
    };
    const respuesta = await apiRequest("POST", "usuarios/reset-password", json);
    if (respuesta.success) {
      alert(respuesta.data.message);
      navigate("/login");
    } else {
      alert(respuesta.data.message);
    }
  };
  const changePage = () => {
    navigate("/login");
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="mb-4">
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>Configurar nueva contraseña </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
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
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="formulario"
          className="w-full mb-4 hover:cursor-pointer"
        >
          Cambiar contraseña
        </Button>
        <Label>¿Deseas iniciar sesión?</Label>
        <Button
          variant="outline"
          className="w-full hover:cursor-pointer"
          onClick={changePage}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
