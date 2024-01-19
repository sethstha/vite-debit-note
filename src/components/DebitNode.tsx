import ItemList from "@/components/ItemList";
import AddProduct from "@/components/AddProduct";
import CustomField from "@/components/CustomField";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { items } from "@/data";

import { DebitNode, debitNodeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import Calculation from "@/components/calculation";
import Supplier from "@/components/supplier";
import Date from "@/components/date";

export default function DebitNote() {
  const form = useForm<DebitNode>({
    resolver: zodResolver(debitNodeSchema),
    defaultValues: {
      supplier: "",
      reference: "",
    },
  });

  const { fields, append, remove } = useFieldArray<DebitNode>({
    control: form.control,
    name: "items",
  });

  const onProductAdd = (value: string) => {
    const currentItem = items.find((item) => item.sku === value) ?? items[0];
    append({
      name: currentItem.name,
      rate: currentItem.price,
      batch: currentItem.batch,
      discount: "0",
      qty: "1",
      sku: currentItem.sku,
      tax: "13",
    });
  };

  const showCalculation = form.watch("items");

  return (
    <div className="container">
      <div className="p-6 shadow-box space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">New Debit note</h1>
            <X />
          </div>
          <Separator />
        </div>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 items-start justify-center gap-6">
              <div className="space-y-4">
                <Supplier />
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Reference no <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="reference no" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Date />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Item/Product</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((_, index) => (
                  <ItemList
                    key={index}
                    index={index}
                    onRemove={(index) => remove(index)}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex">
              <AddProduct onProductAdd={(value) => onProductAdd(value)} />
            </div>
            {showCalculation && showCalculation.length ? <Calculation /> : null}
            <CustomField />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
