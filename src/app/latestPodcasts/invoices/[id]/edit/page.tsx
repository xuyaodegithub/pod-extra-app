import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [invoice] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])

  if (!invoice) {
    notFound()
  }

  // ...
}
