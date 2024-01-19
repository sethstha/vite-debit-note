import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DebitNote } from "@/schemas";
import { useFormContext } from "react-hook-form";

const Calculation = () => {
  const { control, watch } = useFormContext<DebitNote>();
  const watchedItem = watch("items");
  let total = 0,
    discount = 0,
    vat = 0,
    taxTotal = 0,
    grandTotal = 0;

  if (watchedItem) {
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
    vat = (13 / 100) * total;
    taxTotal = total + vat;
    grandTotal = taxTotal;
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
      <div className="space-y-4 text-xs">
        <div className="flex justify-between">
          <span>Total</span>
          <span>{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>{discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Non Taxable Total</span>
          <span>{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxable Total</span>
          <span>{taxTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Vat</span>
          <span>{vat.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>Grand Total</span>
          <span>{grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Calculation;
