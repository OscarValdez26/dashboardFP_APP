import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { iconos } from "@/lib/iconos";
import { useState } from "react";

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
};

function IconSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-15 hover:cursor-pointer">
          Icono
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle></PopoverTitle>
          <PopoverDescription></PopoverDescription>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(iconos).map(([key, Icon]) => {
              return (
                <button
                  key={key}
                  //className="flex items-center justify-center not-only:border rounded-lg size-7 hover:bg-muted"
                  className={value === key ? "border-primary" : ""}
                  onClick={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                >
                  <Icon className="size-5" />
                </button>
              );
            })}
          </div>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export default IconSelector;
