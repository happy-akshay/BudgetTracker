import { accounts } from "@/lib/types";
import { CategorySchema, CategorySchemaType } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconAction } from "@/hooks/Iconaction";
import { Category } from "@prisma/client";
import { toast } from "sonner";
interface CreateCategoryDialogProps {
  types: accounts;
  onSuccessCallback: (category: Category) => void;
  trigger?: ReactNode;
}
const CreateCategoryDialog: FC<CreateCategoryDialogProps> = ({
  types,
  onSuccessCallback,
}) => {
  const queryClient = useQueryClient();
  const [Open, setOpen] = useState(false);
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      type: types,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: IconAction,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type: types,
      });
      toast.success(`Category ${data.name} created successfully`);
      onSuccessCallback(data);
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setOpen((prev) => !prev);
    },
    onError: () => {
      console.log("error");
      toast.error("something went wrong");
    },
  });
  const onsubmit = useCallback(
    (values: CategorySchemaType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <>
      <div>
        <Dialog open={Open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-orange-400 w-full flex gap-2 items-center justify-center rounded-none"
            >
              <PlusSquare /> Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create{" "}
                <span
                  className={cn(
                    types == "income" ? "text-emerald-400" : "text-red-400",
                    "capitalize mx-1.5",
                  )}
                >
                  {types}
                </span>
                Category
              </DialogTitle>
              <DialogDescription>
                Category are used to group your transaction
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full outline"
                          defaultValue={""}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="w-full min-h-[100px] bg-slate-700">
                              {form.watch("icon") ? (
                                <div>
                                  <span>{field.value}</span>
                                  <p className="text-xs text-muted-foreground">
                                    Click to change
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1">
                                  <CircleOff className="max-w-[48px] min-h-[48px] w-full h-full" />
                                  <p className="text-base sm:text-1xl">
                                    Click to select
                                  </p>
                                </div>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[80%] h-[40px] sm:-mt-[400px] -mt-[430px] md:mx-0">
                            <Picker
                              data={data}
                              onEmojiSelect={(emoji: { native: string }) => {
                                field.onChange(emoji.native);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <DialogFooter className="flex gap-2 md:mt-12 mt-0">
              <DialogClose asChild className="px-5 hover:bg-emerald-700">
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onsubmit)}
                  disabled={isPending}
                >
                  {!isPending && "Create"}
                  {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="hover:bg-red-700"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateCategoryDialog;

{
  /* <DialogFooter className="flex gap-2 md:mt-12 mt-0">  // this is change */
}
{
  /* <PopoverContent className="w-[80%] h-[40px] md:-mt-96 -mt-0 md:mx-0"> this is change */
}
