import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { DebitNote } from "@/schemas";
import { X } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  index: number;
  onRemove: (index: number) => void;
}
const ItemList: React.FC<Props> = (props) => {
  const { index, onRemove } = props;
  const { control, watch } = useFormContext<DebitNote>();
  const watchedItem = watch(`items.${index}`);
  let amount = 0;

  if (watchedItem) {
    amount =
      parseFloat(watchedItem.qty) * parseFloat(watchedItem.rate) -
      parseFloat(watchedItem.discount);
  }

  return (
    <TableRow className="text-xs">
      <TableCell>
        {watchedItem.name}
        <FormField
          control={control}
          name={`items.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="dotted"
                  type="text"
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[100px]">
        <FormField
          control={control}
          name={`items.${index}.qty`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="dotted"
                  type="number"
                  placeholder="quantity"
                  {...field}
                />
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
                <Input
                  variant="dotted"
                  type="number"
                  placeholder="rate"
                  {...field}
                />
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
                <Input
                  variant="dotted"
                  type="number"
                  placeholder="quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="w-[150px]">
        <div className="flex items-center">
          <span>13% VAT</span>
        </div>
      </TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={() => onRemove(index)}>
          <X className="h-4 text-red-400" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemList;
