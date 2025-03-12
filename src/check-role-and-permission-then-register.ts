import { Permission } from "./permission";
import { Role } from "./role";

export const checkRoleAndPermissionThenRegister = (
  actual: {
    role: string | undefined;
    permission: string | undefined;
  },
  needed: {
    role: Role[];
    permission: Permission;
  },
  tool: () => void,
) => {
  // TODO 権限チェック
};
