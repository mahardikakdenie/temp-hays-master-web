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
