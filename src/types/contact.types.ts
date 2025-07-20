export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  wa_phone: string;
  status: number;
  status_text: string;
  created_at: string;
  updated_at: string;
}

export type ContactDetail = {
  id: number;
  email: string;
  lat: string;
  lng: string;
  location: string;
  name: string;
  phone: string;
  status: number;
  wa_phone: string;
};

export type CreateContactForm = {
  name: string;
  email: string;
  phone: string;
  wa_phone: string;
  location: string;
  lat: string;
  lng: string;
};

export type UpdateContactForm = {
  id: number;
  status: number;
  name: string;
  email: string;
  phone: string;
  wa_phone: string;
  location: string;
  lat: string;
  lng: string;
};
