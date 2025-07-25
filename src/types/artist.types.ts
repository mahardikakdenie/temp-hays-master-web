export type Artist = {
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
