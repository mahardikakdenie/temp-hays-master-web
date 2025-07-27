export type SubCategory = {
  id: number;
  name: string;
  desc?: string;
  created_at: string;
  updated_at: string;
  status: number;
  status_text: string;
};

export type CreateSCategoryForm = {
  name: string;
  desc: string;
  category_id: number;
};

export type UpdateSCategoryForm = CreateSCategoryForm & {
  id: number;
  status: number;
};

export type SubCategoryList = SubCategory[];
