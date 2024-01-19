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

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const onItemSelect = (value: string) => {
    console.log(value);

    console.log(
      items.find((item) => {
        return item.sku === value;
      })
    );
    setOpen(false);
  };
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
                onSelect={(value) => onItemSelect(value)}
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
}
