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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useAppContext } from "@/context/useAppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoriasType } from "@/types";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/api/api";
import z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const nuevoPresupuestoSchema = z.object({
  idCategoria: z.string().min(1, "Selecciona una categoría"),
  tipoPresupuesto: z.enum(["monto", "porcentaje"]),
  cantidadPresupuesto: z.string().min(1, "Ingresa la cantidad"),
});
type NuevoPresupuestoForm = z.infer<typeof nuevoPresupuestoSchema>;

type Props = {
  obtenerPresupuestos: () => void;
};

function NuevoPresupuesto({ obtenerPresupuestos }: Props) {
  const { categorias } = useAppContext();
  const [mensaje, setMensaje] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<NuevoPresupuestoForm>({
    resolver: zodResolver(nuevoPresupuestoSchema),
    defaultValues: {
      idCategoria: "",
      tipoPresupuesto: "monto",
      cantidadPresupuesto: "",
    },
  });

  const onSubmit = async (data: NuevoPresupuestoForm) => {
    const json = {
      idCategoria: Number(data.idCategoria),
      tipoPresupuesto: data.tipoPresupuesto,
      cantidadPresupuesto: Number(data.cantidadPresupuesto),
    };
    console.log(json);
    const resultado = await apiRequest("POST", "presupuestos/nuevo", json);
    setMensaje(resultado.data.message);
    await obtenerPresupuestos();
  };

  const tipo = useWatch({
    control,
    name: "tipoPresupuesto",
  });
  const porcentaje =
    useWatch({
      control,
      name: "cantidadPresupuesto",
    }) || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-40 hover:cursor-pointer">Nuevo presupuesto</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nuevo presupuesto</SheetTitle>
          <SheetDescription>Asignar nuevo presupuesto</SheetDescription>
        </SheetHeader>
        <form
          id="formulario"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4"
        >
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Tipo de presupuesto</FieldLabel>
                <Controller
                  control={control}
                  name="tipoPresupuesto"
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <Switch
                        className="hover:cursor-pointer"
                        checked={field.value === "monto" ? false : true}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? "porcentaje" : "monto");
                          setValue("cantidadPresupuesto", "");
                        }}
                      />
                      <Label>{tipo}</Label>
                    </div>
                  )}
                />
                <FieldDescription></FieldDescription>
                <FieldError>{errors.tipoPresupuesto?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Categoría</FieldLabel>
                <Controller
                  control={control}
                  name="idCategoria"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
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
                <FieldDescription></FieldDescription>
                <FieldError>{errors.idCategoria?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Cantidad asignada</FieldLabel>
                <Controller
                  control={control}
                  name="cantidadPresupuesto"
                  render={({ field }) => (
                    <div>
                      {tipo === "porcentaje" ? (
                        <div className="flex gap-4 items-center">
                          <div className="w-3xs border-2 rounded-lg p-4 ">
                            <Slider
                              max={100}
                              step={1}
                              value={[Number(field.value)]}
                              onValueChange={(value) =>
                                field.onChange(String(value[0]))
                              }
                            />
                          </div>
                          <p>{porcentaje}%</p>
                        </div>
                      ) : (
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          type="number"
                          step="0.01"
                          placeholder="Cantidad"
                          className="w-3xs"
                        />
                      )}
                    </div>
                  )}
                />

                <FieldDescription></FieldDescription>
                <FieldError>{errors.cantidadPresupuesto?.message}</FieldError>
              </Field>
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
            Guardar presupuesto
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

export default NuevoPresupuesto;
