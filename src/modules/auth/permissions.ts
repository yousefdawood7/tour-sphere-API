export const PERMISSIONS = ['tours:read', 'tours:delete'] as const;

type RolePermissionType = {
  [keyof: string]: (typeof PERMISSIONS)[number][];
};

export const ROLE_PERMISSIONS = {
  admin: [...PERMISSIONS],
  user: [],
} as const satisfies RolePermissionType;
