export type Artist = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status_text: string;
  status: number;
};

export type CreateArtistForm = {
  name: string;
  email: string;
  phone: string;
  desc: string;
  image: File;
};

export type UpdateArtistForm = {
  id: number;
  status: number;
  is_update_image: boolean;
  name: string;
  email: string;
  phone: string;
  desc: string;
  image: File | string;
};
