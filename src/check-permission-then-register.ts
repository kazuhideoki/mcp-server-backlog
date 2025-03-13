import { Permission } from "./permission";

export const checkPermissionThenRegister = (
  actual: {
    permission: Permission;
  },
  needed: {
    permission: Permission;
  },
  tool: () => void,
) => {
  if (
    actual.permission === Permission.MUTATE ||
    (actual.permission === Permission.READ &&
      needed.permission === Permission.READ)
  ) {
    tool();
  }
};
