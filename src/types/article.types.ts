export type ArticleList = {
  id: string;
  title: string;
  status: number;
  status_text: string;
  created_at: string;
  updated_at: string;
};

export type ArticleCreateForm = {
  title: string;
  content: string;
  image: File;
};

export type ArticleUpdateForm = {
  title: string;
  content: string;
  is_update_image: boolean;
  status: number;
  image: File;
};

export type ArticleDetail = {
  id: number;
  content: string;
  image: string;
  status: number;
  title: string;
};
