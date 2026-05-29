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

const registerSchema = z.object({
  email: z.email("Email invalido"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function ForgotPasswordCard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: RegisterForm) => {
    const respuesta = await apiRequest(
      "POST",
      "usuarios/forgot-password",
      data,
    );
    if (respuesta.success) {
      setMessage(respuesta.data.message);
    } else {
      setMessage(respuesta.data.message);
    }
  };
  const changePage = () => {
    navigate("/login");
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="mb-4">
        <CardTitle>Recuperar contraseña</CardTitle>
        <CardDescription>
          Recuperar contraseña de una cuenta existente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
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
            </FieldGroup>
          </FieldSet>
          <Label className="text-md text-red-500">{message}</Label>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="formulario"
          className="w-full hover:cursor-pointer mb-4"
        >
          Recuperar contraseña
        </Button>
        <Label>¿Has recordado la contraseña?</Label>
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
