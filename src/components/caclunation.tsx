import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DebitNode } from "@/schemas";
import { useFormContext } from "react-hook-form";

const Calculation = () => {
  const { control, watch } = useFormContext<DebitNode>();
  const watchedItem = watch("items");
  let total = 0,
    discount = 0;

  if (watchedItem) {
    console.log(watchedItem);
    total = watchedItem
      .map(
        (item) =>
          parseFloat(item.rate) * parseFloat(item.qty) -
          parseFloat(item.discount)
      )
      .reduce((prev, curr) => prev + curr, 0);
    discount = watchedItem
      .map((item) => item.discount)
      .reduce((prev, curr) => prev + parseFloat(curr), 0);
  }
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <FormField
          control={control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Notes"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>*This will appear on print</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discount</TableCell>
            <TableCell>{discount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Non Taxable Total</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Taxable Total</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vat</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Grand Total</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Calculation;
