export type OrderList = {
  name: string;
  email: string;
  phone: string;
  grand_total: string;
  transaction_status: number;
  transaction_status_text: string;
  transaction_date: string;
};

export type CreateOrder = {
  name: string;
  email: string;
  phone: string;
  message: string;
  items: {
    product_id: number;
    quantity: number;
    notes: string;
  }[];
};
