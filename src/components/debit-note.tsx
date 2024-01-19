import ItemList from "@/components/ItemList";
import AddProduct from "@/components/add-product";
import Date from "@/components/date";
import Supplier from "@/components/supplier";
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

import { DebitNode, debitNodeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

export default function DebitNote() {
  const form = useForm<DebitNode>({
    resolver: zodResolver(debitNodeSchema),
    defaultValues: {
      supplier: "",
      reference: "",
    },
  });

  const { fields, prepend, append, remove, insert } = useFieldArray<DebitNode>({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values: DebitNode) => {
    console.log(values);
  };

  const onProductAdd = (value: string) => {
    console.log(value);
    append({
      name: "soemthing",
      amount: 200,
      batch: "Sassas",
      discount: 0,
      qty: 1,
      rate: 2000,
      sku: "sasas",
      tax: 13,
      warehouse: "sasa22",
    });
  };

  return (
    <div className="container">
      <div className="p-6 shadow-box">
        <div className="flex justify-between">
          <div className="h1 text-2xl">New Debit note</div>
          <X />
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 items-start justify-center gap-6">
              <div className="space-y-4">
                <Supplier />
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference no</FormLabel>
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
                {fields.map((item, index) => (
                  <ItemList
                    key={item.sku}
                    index={index}
                    onRemove={(index) => remove(index)}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex">
              <AddProduct onProductAdd={(value) => onProductAdd(value)} />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
