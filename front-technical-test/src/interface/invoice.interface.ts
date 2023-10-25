export interface Invoice {
  id: number;
  invoiceCode: string;
  fullName: string;
  address: string;
  amountDue: string;
  dueDate: string;
  promptPaymentDate: string;
  state: string;
}
