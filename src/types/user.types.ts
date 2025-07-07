export type CreateUserForm = {
  access_id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone: string;
};

export type UserList = {
  id: number;
  fullname: string;
  access_name: string;
  email: string;
  phone: string;
  status: number;
  status_text: string;
};
