import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CategoriasType, PresupuestosType } from "@/types";
import DialogoAlerta from "../generic/dialogoAlerta";
import z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useAppContext } from "@/context/useAppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { apiRequest } from "@/api/api";

type Props = {
  presupuesto: PresupuestosType;
  obtenerDatos: () => Promise<void>;
};

const updatePresupuestoSchema = z.object({
  idCategoria: z.string().min(1, "Seleccione una categoría"),
  tipoPresupuesto: z.enum(["monto", "porcentaje"]),
  cantidadPresupuesto: z.string().min(1, "Ingrese la cantidad presupuestada"),
});

type UpdatePresupuestoForm = z.infer<typeof updatePresupuestoSchema>;

function EditarPresupuesto({ presupuesto, obtenerDatos }: Props) {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { categorias } = useAppContext();
  const {
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePresupuestoForm>({
    resolver: zodResolver(updatePresupuestoSchema),
    defaultValues: {
      idCategoria: categorias
        ?.find((cat) => cat.nombreCategoria === presupuesto.categoria)
        ?.idCategoria.toString(),
      tipoPresupuesto: presupuesto.tipoPresupuesto,
      cantidadPresupuesto: presupuesto.cantidadPresupuesto,
    },
  });
  const reiniciar = () => {
    setMensaje("");
    reset({
      idCategoria: categorias
        ?.find((cat) => cat.nombreCategoria === presupuesto.categoria)
        ?.idCategoria.toString(),

      tipoPresupuesto: presupuesto.tipoPresupuesto,

      cantidadPresupuesto: presupuesto.cantidadPresupuesto,
    });
  };
  const borrarPresupuesto = async () => {
    setMensaje("");
    const resultado = await apiRequest(
      "DELETE",
      `presupuestos/${presupuesto.idPresupuesto}`,
    );
    if (resultado.success) {
      alert(resultado.data.message);
      await obtenerDatos();
      setOpen(false);
    } else {
      setMensaje(resultado.data.message);
    }
  };
  const onSubmit = async (data: UpdatePresupuestoForm) => {
    const json = {
      idCategoria: Number(data.idCategoria),
      tipoPresupuesto: data.tipoPresupuesto,
      cantidadPresupuesto: Number(data.cantidadPresupuesto),
    };
    const resultado = await apiRequest(
      "PATCH",
      `presupuestos/${presupuesto.idPresupuesto}`,
      json,
    );
    setMensaje(resultado.data.message);
    await obtenerDatos();
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

  useEffect(() => {
    reset({
      idCategoria: categorias
        ?.find((cat) => cat.nombreCategoria === presupuesto.categoria)
        ?.idCategoria.toString(),

      tipoPresupuesto: presupuesto.tipoPresupuesto,

      cantidadPresupuesto: presupuesto.cantidadPresupuesto,
    });
  }, [presupuesto]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="pt-2">
          <DialogTitle>Editar presupuesto</DialogTitle>
          <DialogDescription>Realiza los cambios deseados</DialogDescription>
        </DialogHeader>
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
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled
                    >
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
        <DialogFooter>
          <Button
            type="submit"
            form="formulario"
            className="hover:cursor-pointer"
          >
            Guardar cambios
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={reiniciar}
              className="hover:cursor-pointer"
            >
              Cerrar
            </Button>
          </DialogClose>
          <DialogoAlerta
            mensajeBoton="Borrar presupuesto"
            variant="destructive"
            titulo="Borrar presupuesto"
            mensaje="Esta seguro que desea borrar el presupuesto?, Esta accion no se puede deshacer"
            mensajeAceptar="Borrar presupuesto"
            onClick={borrarPresupuesto}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditarPresupuesto;
