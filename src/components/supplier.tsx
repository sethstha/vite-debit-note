import { Button } from "@/components/ui/button";
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
import { DebitNode } from "@/schemas";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Command, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function Supplier() {
  const { control, setValue } = useFormContext<DebitNode>();
  return (
    <FormField
      control={control}
      name="supplier"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Supplier Name <span className="text-red-400">*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? suppliers.find(
                        (suppliers) => suppliers.value === field.value
                      )?.label
                    : "Eg: Globex Corporation"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="PopoverContent p-0">
              <Command>
                <CommandInput
                  placeholder="Search for suppliers"
                  className="h-9"
                />
                <CommandEmpty>No supplier found.</CommandEmpty>
                <CommandGroup>
                  {suppliers.map((suppliers) => (
                    <CommandItem
                      value={suppliers.label}
                      key={suppliers.value}
                      onSelect={() => {
                        setValue("supplier", suppliers.value);
                      }}
                    >
                      {suppliers.label}
                      <ChevronDown
                        className={cn(
                          "ml-auto h-4 w-4",
                          suppliers.value === field.value
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
