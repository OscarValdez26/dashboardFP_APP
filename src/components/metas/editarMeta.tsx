import { Button } from "@/components/ui/button";
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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogoAlerta from "@/components/generic/dialogoAlerta";
import { apiRequest } from "@/api/api";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/useAppContext";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import IconSelector from "@/components/generic/iconSelector";
import { Textarea } from "@/components/ui/textarea";
import InputCalendario from "@/components/generic/inputCalendario";
import { iconos } from "@/lib/iconos";
import type { MetasType } from "@/types";

type Props = {
  meta: MetasType;
};
const updateMetaSchema = z.object({
  nombreMeta: z.string().min(1, "La meta nueva necesita un nombre"),
  descripcionMeta: z.string().min(4, "Por favor agrega una descripción"),
  fechaLimite: z
    .date()
    .optional()
    .refine((fecha) => fecha !== undefined, {
      message: "Selecciona una fecha limite",
    })
    .refine((fecha) => !fecha || fecha > new Date(), {
      message: "La fecha limite debe ser posterior al dia de hoy",
    }),
  cantidadObjetivo: z
    .string()
    .min(1, "Escribe la cantidad que quieres ahorrar"),
  iconoMeta: z.string().optional(),
});

type UpdateMetaForm = z.infer<typeof updateMetaSchema>;

function EditarMeta({ meta }: Props) {
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);
  const { obtenerMetas } = useAppContext();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateMetaForm>({
    resolver: zodResolver(updateMetaSchema),
    defaultValues: {
      nombreMeta: meta.nombre,
      descripcionMeta: meta.descripcion,
      fechaLimite: new Date(meta.fechaLimite),
      cantidadObjetivo: meta.objetivo,
      iconoMeta: meta.icono,
    },
  });
  const borrarMeta = async () => {
    setMensaje("");
    const resultado = await apiRequest("DELETE", `metas/${meta.idMeta}`);
    if (resultado.success) {
      alert(resultado.data.message);
      await obtenerMetas();
      setOpen(false);
    } else {
      setMensaje(resultado.data.message);
    }
  };
  const onSubmit = async (data: UpdateMetaForm) => {
    const json = {
      nombreMeta: data.nombreMeta,
      descripcionMeta: data.descripcionMeta,
      fechaLimite: data.fechaLimite?.toISOString(),
      cantidadObjetivo: Number(data.cantidadObjetivo),
      iconoMeta: data.iconoMeta,
    };
    const resultado = await apiRequest(
      "PATCH",
      `metas/update/${meta.idMeta}`,
      json,
    );
    if (resultado.success) {
      setMensaje(resultado.data.message);
      await obtenerMetas();
      //setOpen(false);
    } else {
      setMensaje(resultado.data.message);
    }
  };
  const iconoSeleccionado =
    useWatch({
      control,
      name: "iconoMeta",
    }) || "";
  const Icon = iconos[iconoSeleccionado];
  const reiniciar = () => {
    setMensaje("");
    reset({
      nombreMeta: meta.nombre,
      descripcionMeta: meta.descripcion,
      fechaLimite: new Date(meta.fechaLimite),
      cantidadObjetivo: meta.objetivo,
      iconoMeta: meta.icono,
    });
  };
  useEffect(() => {
    reset({
      nombreMeta: meta.nombre,
      descripcionMeta: meta.descripcion,
      fechaLimite: new Date(meta.fechaLimite),
      cantidadObjetivo: meta.objetivo,
      iconoMeta: meta.icono,
    });
  }, [meta]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="pt-2">
          <DialogTitle>Editar meta</DialogTitle>
          <DialogDescription>Realiza los cambios deseados</DialogDescription>
        </DialogHeader>
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
                    name="iconoMeta"
                    render={({ field }) => (
                      <div className="flex gap-4 items-center">
                        <IconSelector
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {iconoSeleccionado && <Icon />}
                      </div>
                    )}
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.iconoMeta?.message}</FieldError>
                </Field>
                <Field>
                  <Input
                    {...register("nombreMeta")}
                    placeholder="Nombre de la meta"
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.nombreMeta?.message}</FieldError>
                </Field>
                <Field>
                  <Textarea
                    {...register("descripcionMeta")}
                    placeholder="Descripción"
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.descripcionMeta?.message}</FieldError>
                </Field>
                <Field>
                  <Input
                    {...register("cantidadObjetivo")}
                    type="number"
                    step="0.01"
                    placeholder="Cantidad que deseas ahorrar"
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.cantidadObjetivo?.message}</FieldError>
                </Field>
                <Field>
                  <Controller
                    control={control}
                    name="fechaLimite"
                    render={({ field }) => (
                      <InputCalendario
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldDescription></FieldDescription>
                  <FieldError>{errors.fechaLimite?.message}</FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
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
            mensajeBoton="Borrar meta"
            variant="destructive"
            titulo="Borrar meta"
            mensaje="Esta seguro que desea borrar la meta?, Esta accion no se puede deshacer"
            mensajeAceptar="Borrar meta"
            onClick={borrarMeta}
          />
          {/* <Button variant="destructive" onClick={borrarMeta}>
              Borrar meta
            </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditarMeta;
