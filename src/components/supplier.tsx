import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { suppliers } from "@/data";
import { cn } from "@/lib/utils";
import { DebitNote } from "@/schemas";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function Supplier() {
  const { control, setValue } = useFormContext<DebitNote>();
  return (
    <FormField
      control={control}
      name="supplier"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Supplier name <span className="text-red-400">*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="secondary"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    suppliers.find((supplier) => supplier.value === field.value)
                      ?.label
                  ) : (
                    <span className="text-xs text-gray-400 font-normal">
                      Eg: Globex Corporation
                    </span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="PopoverContent">
              <Command>
                <CommandInput
                  placeholder="Search suppliers..."
                  className="h-9"
                />
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup className="p-0">
                  {suppliers.map((supplier) => (
                    <CommandItem
                      value={supplier.label}
                      key={supplier.value}
                      onSelect={() => {
                        setValue("supplier", supplier.value);
                      }}
                    >
                      {supplier.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          supplier.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
