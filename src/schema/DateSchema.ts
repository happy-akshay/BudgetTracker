import { MaxDays } from "@/lib/Max-days";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const OverviewDateSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);
    const isValidRange = days >= 0 && days <= MaxDays;
    return isValidRange;
  });
