export type Product = {
  artist_name: string;
  theme_name: string;
  category_name: string;
  name: string;
  status: number;
  status_text: string;
  created_at: string;
  updated_at: string;
};

export type CreateProductForm = {
  artist_id: number;
  theme_id: number;
  category_id: number;
  sub_category_id: number;
  name: string;
  sku: string;
  year: string;
  width: number;
  length: number;
  unit: string;
  price: number;
  desc: string;
  images: File[];
};
