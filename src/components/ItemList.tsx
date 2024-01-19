import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { DebitNode } from "@/schemas";
import { X } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  index: number;
  onRemove: (index: number) => void;
}
const ItemList: React.FC<Props> = (props) => {
  const { index, onRemove } = props;
  const { control, watch } = useFormContext<DebitNode>();
  const watchedItem = watch(`items.${index}`);
  const amount = watchedItem.qty * watchedItem.rate - watchedItem.discount;

  return (
    <TableRow>
      <TableCell>{watchedItem.name}</TableCell>
      <TableCell className="w-[100px]">
        <FormField
          control={control}
          name={`items.${index}.qty`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[150px]">
        <FormField
          control={control}
          name={`items.${index}.rate`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[150px]">
        <FormField
          control={control}
          name={`items.${index}.discount`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[150px]">
        <div className="flex items-center">
          <FormField
            control={control}
            name={`items.${index}.tax`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" placeholder="quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span>VAT</span>
        </div>
      </TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>
        <Button variant="link" onClick={() => onRemove(index)}>
          <X />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemList;
