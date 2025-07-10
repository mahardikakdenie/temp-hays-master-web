interface SubCategory {
  id: string;
  name: string;
  desc?: string;
  created_at: string;
  updated_at: string;
  status: number;
  status_text: string;
}

export type SubCategoryList = SubCategory[];
