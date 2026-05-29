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
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import IconSelector from "@/components/generic/iconSelector";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { iconos } from "@/lib/iconos";
import InputCalendario from "@/components/generic/inputCalendario";
import { apiRequest } from "@/api/api";
import { useAppContext } from "@/context/useAppContext";

const nuevaMetaSchema = z.object({
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

type NuevaMetaForm = z.infer<typeof nuevaMetaSchema>;

function NuevaMeta() {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { obtenerMetas } = useAppContext();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NuevaMetaForm>({
    resolver: zodResolver(nuevaMetaSchema),
    defaultValues: {
      nombreMeta: "",
      descripcionMeta: "",
      fechaLimite: undefined,
      cantidadObjetivo: "",
      iconoMeta: "",
    },
  });
  const onSubmit = async (data: NuevaMetaForm) => {
    const nuevaMeta = {
      ...data,
      fechaInicio: new Date().toISOString(),
      fechaLimite: data.fechaLimite?.toISOString(),
      cantidadInicial: 0,
      cantidadObjetivo: Number(data.cantidadObjetivo),
    };
    const resultado = await apiRequest("POST", "metas/nueva", nuevaMeta);
    if (resultado.success) {
      setMensaje(resultado.data.message);
      await obtenerMetas();
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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="hover:cursor-pointer">Nueva Meta</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nueva Meta</SheetTitle>
          <SheetDescription>Registrar nueva meta</SheetDescription>
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
        <SheetFooter>
          <Button
            type="submit"
            form="formulario"
            className="hover:cursor-pointer"
          >
            Crear meta
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

export default NuevaMeta;
