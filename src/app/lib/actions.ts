'use server'
import { z } from 'zod'
// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string(),
//   amount: z.coerce.number(),
//   status: z.enum(['pending', 'paid']),
//   date: z.string(),
// })
// const CreateInvoice = FormSchema.omit({ id: true, date: true })
// const date = new Date().toISOString().split('T')[0]
export async function createInvoice(formData: FormData) {
  console.log(FormData, 'pppp')
}
