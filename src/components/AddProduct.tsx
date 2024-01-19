import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { items } from "@/data";
import { useState } from "react";

interface Props {
  onProductAdd: (value: string) => void;
}
const AddProduct: React.FC<Props> = (props) => {
  const { onProductAdd } = props;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="link">Add item</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search for items" className="h-9" />
          <CommandEmpty>No Items found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                value={item.sku}
                key={item.sku}
                onSelect={(value) => onProductAdd(value)}
              >
                <div className="flex justify-between w-full">
                  <div className="space-y-2">
                    <h3 className="text-xl">{item.name}</h3>
                    <div className="flex gap-2">
                      <span className="text-blue-300">{item.sku}</span>
                      <span>Batch: {item.batch}</span>
                    </div>
                  </div>
                  <div>Rs. {item.price}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddProduct;
