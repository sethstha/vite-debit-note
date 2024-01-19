import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import React from "react";

export default function ItemList() {
  return (
    <TableRow>
      <TableCell>Old Durbar</TableCell>
      <TableCell>
        <Input type="number" />
      </TableCell>
      <TableCell>
        <Input type="number" />
      </TableCell>
      <TableCell>
        <Input type="number" />
      </TableCell>
      <TableCell>13% VAT</TableCell>
      <TableCell>4140.00</TableCell>
      <TableCell>
        <Button variant="link">
          <X />
        </Button>
      </TableCell>
    </TableRow>
  );
}
