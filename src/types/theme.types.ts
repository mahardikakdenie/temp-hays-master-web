export interface Theme {
  name: string;
  desc: string;
  status: number;
  status_text: string;
  created_at: string;
  updated_at: string;
}

export type CreateThemeForm = {
  name: string;
  desc: string;
};
