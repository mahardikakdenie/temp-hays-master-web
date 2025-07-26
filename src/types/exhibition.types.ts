export type EXHIBITION = {
  id: number;
  name: string;
  artist_name: string;
  desc: string;
  start_date: string;
  end_date: string;
  status: number;
  image: File;
  status_text: string;
};

export type CreateExhitionForm = {
  artist_id: number;
  name: string;
  desc: string;
  start_date: string;
  end_date: string;
  image: File;
};

export type UpdateExhibitionForm = {
  artist_id: number;
  id: number;
  name: string;
  desc: string;
  is_update_image: boolean;
  start_date: string;
  end_date: string;
  image: File;
  status: number;
};
