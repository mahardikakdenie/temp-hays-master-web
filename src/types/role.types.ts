export type CreateRoleForm = {
  name: string;
  desc: string;
  actions: {
    privilege_id: number;
  }[];
};

export type RoleMenu = {
  id: number;
  name: string;
  path: string;
  icon: string;
  level: string;
  is_group: string;
  actions: {
    privilege_id: number;
    action: string;
  }[];
  child: RoleMenu[];
};

export type UpdateRoleMenu = {
  id: number;
  status: number;
  name: string;
  desc: string;
  actions: {
    privilege_id: number;
  }[];
};

export type RoleDetailMenu = {
  id: number;
  name: string;
  desc: string;
  status: number;
  menu: RoleMenu[];
};
