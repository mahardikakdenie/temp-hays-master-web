export type CategoryBase = {
  name: string;
  desc: string;
};

export type CategoryMeta = {
  id: number;
  status: number;
  updatedAt: string;
  createdAt: string;
};

export type Category = CategoryBase & CategoryMeta;

export type CreateCategoryForm = CategoryBase;

export type UpdateCategoryForm = CategoryBase & {
  id: number;
  status: number;
};
