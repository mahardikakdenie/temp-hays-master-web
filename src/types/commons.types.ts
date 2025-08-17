export type Nullable<T> = T | undefined;

export type Context<T> = {
  params: Promise<T>;
};

export type Session = {
  token: string;
  isLogin: boolean;
};

export type User = {
  id: number;
  fullname: string;
  access_name: string;
  email: string;
  phone: string;
  image: string;
};

export type Device = {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
  userAgent: string;
};

export type Permission = {
  id: number;
  path: string;
  actions: {
    view: number;
    create: number;
    update: number;
    delete: number;
  };
};

export type Menu = {
  id: number;
  name: string;
  path: string;
  icon: string;
  level: number;
  child: Menu[];
};

export type MenuDetail = {
  id: number;
  name: string;
  sort: number;
  status: number;
};

export type Options = {
  id: string | number;
  name: string;
};

export type Filter = {
  [key: string]: string;
};

export type Sort = {
  column: string;
  order: '' | 'ASC' | 'DESC';
};

export type Meta = {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
};
