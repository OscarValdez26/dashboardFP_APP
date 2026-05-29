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
import { Controller, useForm, useWatch } from "react-hook-form";
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
import type { CategoriasType } from "@/types";
import { apiRequest } from "@/api/api";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const nuevoMovimientoSchema = z.object({
  categoriaMovimiento: z.string("Por favor selecciona una categoría"),
  descripcionMovimiento: z.string().min(4, "Por favor agrega una descripción"),
  cantidadMovimiento: z.string().min(1, "Ingresa la cantidad"),
  cuenta: z.string().min(1, "Seleccione una cuenta"),
});
type NuevoMovimientoForm = z.infer<typeof nuevoMovimientoSchema>;
type PostMovimiento = {
  categoriaMovimiento: number;
  tipoMovimiento: string;
  descripcionMovimiento: string;
  cantidadMovimiento: number;
  cuentaOrigen?: number;
  cuentaDestino?: number;
};

function NuevoMovimiento() {
  const { categorias, cuentas, obtenerCuentas } = useAppContext();
  const [mensaje, setMensaje] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NuevoMovimientoForm>({
    resolver: zodResolver(nuevoMovimientoSchema),
    defaultValues: {
      categoriaMovimiento: "",
      descripcionMovimiento: "",
      cantidadMovimiento: "",
      cuenta: "",
    },
  });
  const categoriaSeleccionada = useWatch({
    control,
    name: "categoriaMovimiento",
  });
  const categoriaActual = categorias?.find(
    (categoria: CategoriasType) =>
      categoria.idCategoria.toString() === categoriaSeleccionada,
  );

  const onSubmit = async (data: NuevoMovimientoForm) => {
    const datos: PostMovimiento = {
      categoriaMovimiento: Number(data.categoriaMovimiento),
      tipoMovimiento: categoriaActual!.tipoCategoria,
      descripcionMovimiento: data.descripcionMovimiento,
      cantidadMovimiento: Number(data.cantidadMovimiento),
    };
    if (datos.tipoMovimiento === "ingreso")
      datos.cuentaDestino = Number(data.cuenta);
    if (datos.tipoMovimiento === "gasto")
      datos.cuentaOrigen = Number(data.cuenta);
    const respuesta = await apiRequest("POST", "movimientos/nuevo", datos);
    setMensaje(respuesta.data.message);
    await obtenerCuentas();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-40 hover:cursor-pointer">Nuevo movimiento</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nuevo movimiento</SheetTitle>
          <SheetDescription>Registrar nuevo movimiento</SheetDescription>
        </SheetHeader>
        <form
          id="formulario"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4"
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <Controller
                  control={control}
                  name="categoriaMovimiento"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ingresos</SelectLabel>
                          {categorias &&
                            categorias
                              .filter(
                                (categoria: CategoriasType) =>
                                  categoria.tipoCategoria === "ingreso",
                              )
                              .map((categoria: CategoriasType) => (
                                <SelectItem
                                  key={categoria.idCategoria}
                                  value={categoria.idCategoria.toString()}
                                >
                                  {categoria.nombreCategoria}
                                </SelectItem>
                              ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Gastos</SelectLabel>
                          {categorias &&
                            categorias
                              .filter(
                                (categoria: CategoriasType) =>
                                  categoria.tipoCategoria === "gasto",
                              )
                              .map((categoria: CategoriasType) => (
                                <SelectItem
                                  key={categoria.idCategoria}
                                  value={categoria.idCategoria.toString()}
                                >
                                  {categoria.nombreCategoria}
                                </SelectItem>
                              ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldDescription className="pl-2">
                  {categoriaActual?.descripcionCategoria}
                </FieldDescription>
                <FieldError>{errors.categoriaMovimiento?.message}</FieldError>
              </Field>
              <Field>
                <Controller
                  control={control}
                  name="cuenta"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Cuenta" />
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
                <FieldError>{errors.cuenta?.message}</FieldError>
              </Field>
              <Field>
                <Textarea
                  {...register("descripcionMovimiento")}
                  placeholder="Descripción"
                />
                <FieldDescription></FieldDescription>
                <FieldError>{errors.descripcionMovimiento?.message}</FieldError>
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

export default NuevoMovimiento;
