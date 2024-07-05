// "use client";

"use client";

import React, { FC, ReactNode, useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { accounts } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  TransactionSchema,
  TransactionSchemaType,
} from "@/schema/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CategoryPicker from "./CategoryPicker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransaction } from "@/hooks/CreateTransaction";
import { toast } from "sonner";
import { DateCreate } from "@/lib/DateCreate";

interface DialogboxProps {
  types: accounts;
  children: ReactNode;
}

const Dialogbox: FC<DialogboxProps> = ({ types, children }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: types,
      date: new Date(),
    },
  });

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success("Transaction created");
      form.reset({
        type: types,
        description: "",
        amount: 0,
        date: new Date(),
        category: undefined,
      });
      queryClient.invalidateQueries({
        queryKey: ["overview"],
      });
      setOpen((prev) => !prev);
    },
  });

  const onSubmit = useCallback(
    (value: TransactionSchemaType) => {
      mutate({
        ...value,
        date: DateCreate(value.date),
      });
    },
    [mutate]
  );

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">
              Create a New{" "}
              <span
                className={cn(
                  types === "income" ? "text-emerald-400" : "text-red-400",
                  "mx-2"
                )}
              >
                {types}
              </span>
              Transaction
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="md:space-y-4 max-w-full w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Description</FormLabel>
                    <FormControl>
                      <Input defaultValue="" {...field} className="outline" />
                    </FormControl>
                    <FormDescription>
                      Transaction description (optional)
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Amount</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={0}
                        {...field}
                        type="number"
                        className="outline"
                      />
                    </FormControl>
                    <FormDescription>
                      Transaction amount (required)
                    </FormDescription>
                  </FormItem>
                )}
              />
              Transaction: {form.watch("category")}
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block">Category</FormLabel>
                      <FormControl>
                        <CategoryPicker
                          types={types}
                          onChange={handleCategoryChange}
                        />
                      </FormControl>
                      <FormDescription>Select a Category</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block">Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            initialFocus
                            onSelect={(value) => {
                              if (!value) return;
                              field.onChange(value);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Select a Date</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <DialogFooter className="flex gap-2">
            <DialogClose asChild className="px-5 hover:bg-emerald-700">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
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
  );
};

export default Dialogbox;



















// import React, { FC, ReactNode, useCallback, useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { accounts } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import { useForm } from "react-hook-form";
// import {
//   TransactionSchema,
//   TransactionSchemaType,
// } from "@/schema/TransactionSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import CategoryPicker from "./CategoryPicker";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { CalendarHeart, CalendarIcon, Loader2 } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "../ui/calendar";
// import {useMutation, useQueryClient } from "@tanstack/react-query";
// import { CreateTransaction } from "@/hooks/CreateTransaction";
// import { toast } from "sonner";
// import { DateCreate } from "@/lib/DateCreate";

// interface dialogboxprops {
//   types: accounts;
//   children: ReactNode;
// }

// const Dialogbox: FC<dialogboxprops> = ({ types,children }) => {

//   const [open,setopen]=useState(false)
//   const queryClient=useQueryClient()
//   const form = useForm<TransactionSchemaType>({
//     resolver: zodResolver(TransactionSchema),
//     defaultValues: {
//       type: types,
//       date: new Date(),
//     },
//   });
//   const handleCategoryChange=useCallback((value:string)=>{
// form.setValue("category",value)
//   },[form])
// const {mutate,isPending}=useMutation({
//   mutationFn:CreateTransaction,
//   onSuccess:()=>{
//     toast.success("Transsaction created")
//     form.reset({
//       type:types,
//       description:"",
//       amount:0,
//       date:new Date(),
//       category:undefined,
//     })
//     queryClient.invalidateQueries({
//       queryKey:["overview"],
//     })
//     setopen((prev=>!prev))
//   }
// })

// const onsubmit=useCallback((value:TransactionSchemaType)=>{
//   // toast.loading("creating Transaction",{id:"create-transaction"})
//   mutate({
//     ...value,
//     date:DateCreate(value.date)
//   })
// },[mutate])
//   return (
//     <>
//     <div>
//       <Dialog open={open} onOpenChange={setopen}>
//         <DialogTrigger asChild>{children}</DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-left">
//               Create a New{" "}
//               <span
//                 className={cn(
//                   types == "income" ? "text-emerald-400" : "text-red-400",
//                   "mx-2"
//                 )}
//               >
//                 {types}
//               </span>
//               Transaction
//             </DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form className="md:space-y-4 max-w-full w-full" onSubmit={form.handleSubmit(onsubmit)}>
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block">Description</FormLabel>
//                     <FormControl>
//                       <Input defaultValue={""} {...field} className="outline" />
//                     </FormControl>
//                     <FormDescription>
//                       Transaction description (optional)
//                     </FormDescription>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="amount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block">Amount</FormLabel>
//                     <FormControl>
//                       <Input
//                         defaultValue={0}
//                         {...field}
//                         type="number"
//                         className="outline"
//                       />
//                     </FormControl>
//                     <FormDescription>
//                       Transaction amount (required)
//                     </FormDescription>
//                   </FormItem>
//                 )}
//               />
//               Transaction:{form.watch("category")}
//               <div className="flex justify-between">
//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block">Category</FormLabel>
//                     <FormControl>
//                       <CategoryPicker types={types} onChange={handleCategoryChange} />
//                     </FormControl>
//                     <FormDescription>Select a Category</FormDescription>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="date"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="block">Date</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild> 
//                         <FormControl>
//                           <Button className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
//                             {field.value?(format(field.value,"PPP")):(<span>Pick a date</span>)}
//                             <CalendarIcon/>
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent>
//                         <Calendar mode='single' selected={field.value} initialFocus 
//                         onSelect={(value)=>{
//                           if(!value) return;
//                           field.onChange(value)
//                         }}/>
//                       </PopoverContent>
//                     </Popover>
//                     <FormDescription>Select a Date</FormDescription>
//                     <FormMessage/>
//                   </FormItem>
//                 )}
//               />
//               </div>
//             </form>
//           </Form>

//           <DialogFooter className="flex gap-2">
//               <DialogClose asChild className="px-5 hover:bg-emerald-700">
//                 <Button
//                   type="submit"
//                   onClick={form.handleSubmit(onsubmit)}
//                   disabled={isPending}
//                 >
//                   {!isPending && "Create"}
//                   {isPending && <Loader2 className="animate-spin" />}
//                 </Button>
//               </DialogClose>
//               <DialogClose asChild>
//                 <Button type="button"
//                   className="hover:bg-red-700"
//                   onClick={() => {
//                     form.reset();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </DialogClose>
//             </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       </div>
//     </>
//   );
// };

// export default Dialogbox;
