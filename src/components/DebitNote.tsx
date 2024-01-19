import ItemList from "@/components/ItemList";
import AddProduct from "@/components/AddProduct";
import CustomField from "@/components/CustomField";
import { CodeBlock, dracula } from "react-code-blocks";
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

import { DebitNote, DebitNoteSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Calculation from "@/components/Calculation";
import Supplier from "./supplier";
import Date from "./date";


const DebitNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState<string>();

  const form = useForm<DebitNote>({
    resolver: zodResolver(DebitNoteSchema),
    defaultValues: {
      supplier: "",
      reference: "",
    },
  });

  const { fields, append, remove } = useFieldArray<DebitNote>({
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

  const onSubmit = (values: DebitNote) => {
    setCode(JSON.stringify(values, null, 4));
    setIsOpen(true);
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
              <Separator />
              {showCalculation && showCalculation.length ? (
                <Calculation />
              ) : null}
              <CustomField />
              <div className="flex justify-end">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>You have submitted your form</DialogTitle>
            <DialogDescription>
              <p className="pb-4">Your form code looks like</p>
              <CodeBlock text={code} language="json" theme={dracula} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DebitNote;
