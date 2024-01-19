import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DebitNote } from "@/schemas";
import { ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

const CustomField = () => {
  const { control } = useFormContext<DebitNote>();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h4>Custom Fields</h4>
        <ChevronRight />
      </div>
      <Separator />
      <FormField
        control={control}
        name="terms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Terms & Conditions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter Notes"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomField;
