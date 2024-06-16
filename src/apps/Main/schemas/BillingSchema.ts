import * as z from 'zod';

export const BillingSchema = z.object({

});

export type Billing = z.infer<typeof BillingSchema>;