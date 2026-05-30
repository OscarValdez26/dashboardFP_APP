import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/useAppContext";
import { apiRequest } from "@/api/api";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const nuevaTransferenciaSchema = z
  .object({
    descripcionMovimiento: z
      .string()
      .min(4, "Por favor agrega una descripción"),
    cantidadMovimiento: z.string().min(1, "Ingresa la cantidad"),
    tipoMovimiento: z.string().optional(),
    cuentaOrigen: z.string().min(1, "Seleccione una cuenta"),
    cuentaDestino: z.string().min(1, "Seleccione una cuenta"),
  })
  .refine((data) => data.cuentaOrigen !== data.cuentaDestino, {
    message: "La cuenta de origen y destino debe ser diferente",
    path: ["cuentaDestino"],
  });
type NuevaTransferenciaForm = z.infer<typeof nuevaTransferenciaSchema>;
type PostMovimiento = {
  tipoMovimiento: string;
  descripcionMovimiento: string;
  cantidadMovimiento: number;
  cuentaOrigen: number;
  cuentaDestino: number;
};

function NuevaTransferencia() {
  const { cuentas, obtenerCuentas } = useAppContext();
  const [mensaje, setMensaje] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NuevaTransferenciaForm>({
    resolver: zodResolver(nuevaTransferenciaSchema),
    defaultValues: {
      tipoMovimiento: "",
      descripcionMovimiento: "",
      cantidadMovimiento: "",
      cuentaOrigen: "",
      cuentaDestino: "",
    },
  });

  const onSubmit = async (data: NuevaTransferenciaForm) => {
    setMensaje("Guardando transferencia");
    const datos: PostMovimiento = {
      tipoMovimiento: "transferencia",
      descripcionMovimiento: data.descripcionMovimiento,
      cantidadMovimiento: Number(data.cantidadMovimiento),
      cuentaOrigen: Number(data.cuentaOrigen),
      cuentaDestino: Number(data.cuentaDestino),
    };
    const respuesta = await apiRequest("POST", "movimientos/nuevo", datos);

    setMensaje(respuesta.data.message);
    if (respuesta.success) {
      reset();
      await obtenerCuentas();
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="w-40 hover:cursor-pointer">
          Nueva Transferencia
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nueva Transferencia</SheetTitle>
          <SheetDescription>
            Transferencia entre cuentas propias
          </SheetDescription>
        </SheetHeader>
        <form
          id="formulario"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4"
        >
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Controller
                    control={control}
                    name="cuentaOrigen"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Cuenta de origen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Cuenta</SelectLabel>
                            {cuentas &&
                              cuentas.map((cuenta) => (
                                <SelectItem
                                  key={cuenta.idCuenta}
                                  value={cuenta.idCuenta.toString()}
                                >
                                  {cuenta.nombre}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.cuentaOrigen?.message}</FieldError>
                </Field>
                <Field>
                  <Controller
                    control={control}
                    name="cuentaDestino"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Cuenta de destino" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Cuenta</SelectLabel>
                            {cuentas &&
                              cuentas.map((cuenta) => (
                                <SelectItem
                                  key={cuenta.idCuenta}
                                  value={cuenta.idCuenta.toString()}
                                >
                                  {cuenta.nombre}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.cuentaDestino?.message}</FieldError>
                </Field>
                <Field>
                  <Textarea
                    {...register("descripcionMovimiento")}
                    placeholder="Descripción"
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>
                    {errors.descripcionMovimiento?.message}
                  </FieldError>
                </Field>
                <Field>
                  <Input
                    {...register("cantidadMovimiento")}
                    type="number"
                    step="0.01"
                    placeholder="Cantidad"
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.cantidadMovimiento?.message}</FieldError>
                </Field>
                {/* <Field>
                  <FieldError>{mensaje}</FieldError>
                </Field> */}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
          <Label className="text-lg text-red-500 justify-self-center">
            {mensaje}
          </Label>
        </form>
        <SheetFooter>
          <Button
            type="submit"
            form="formulario"
            className="hover:cursor-pointer"
          >
            Guardar movimiento
          </Button>
          <SheetClose asChild>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() => {
                setMensaje("");
                reset();
              }}
            >
              Cerrar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NuevaTransferencia;
