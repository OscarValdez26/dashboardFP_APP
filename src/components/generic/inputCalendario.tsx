import { es } from "react-day-picker/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fechaCorta } from "@/helpers/formatoFecha";
import { useState } from "react";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export function InputCalendario({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const click = (date: Date | undefined) => {
    setOpen(false);
    onChange(date);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-45 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {value ? fechaCorta(value.toString()) : <span>Seleccione fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar locale={es} mode="single" selected={value} onSelect={click} />
      </PopoverContent>
    </Popover>
  );
}

export default InputCalendario;
