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
        <Button variant="link" className="text-xs font-normal text-gray-400">
          Add code or product
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] pb-1" align="start">
        <Command>
          <CommandInput placeholder="Search product" className="h-10" />
          <CommandEmpty>No Items found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                value={item.sku}
                key={item.sku}
                onSelect={(value) => onProductAdd(value)}
              >
                <div className="flex justify-between w-full items-center">
                  <div className="space-y-1">
                    <h3 className="text-[13px] font-medium">{item.name}</h3>
                    <div className="flex gap-2 text-[11px]">
                      <span className="text-blue-300">{item.sku}</span>
                      <span>Batch: {item.batch}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Rs. {item.price}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <div className="border-t border-gray-100 text-center">
            <Button variant="link" className="text-blue-500 text-xs">
              Add New
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddProduct;
