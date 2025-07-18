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
