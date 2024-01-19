import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import React from "react";

interface Props {
  index: number;
  onRemove: (index: number) => void;
}
const ItemList: React.FC<Props> = (props) => {
  const { index, onRemove } = props;
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
        <Button variant="link" onClick={() => onRemove(index)}>
          <X />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ItemList;
