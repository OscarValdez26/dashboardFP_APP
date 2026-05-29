import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  texto: string;
  click: () => void;
};

function ButtonSort({ texto, click }: Props) {
  return (
    <div className="flex justify-center">
      <Button
        variant="ghost"
        className="justify-self-center hover:cursor-pointer shadow-none"
        onClick={click}
      >
        {texto}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

export default ButtonSort;
