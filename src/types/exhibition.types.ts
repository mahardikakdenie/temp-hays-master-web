export type EXHIBITION = {
  id: number;
  name: string;
  artist_name: string;
  desc: string;
  start_date: string;
  end_date: string;
  status: number;
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
