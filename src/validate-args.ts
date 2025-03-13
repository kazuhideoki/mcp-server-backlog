import { Permission } from "./permission";

export const getValidatedArgs = (actual: {
  permission: string | undefined;
}): {
  permission: Permission;
} => {
  // actual.permission が Permission であるかをチェックする
  if (actual.permission === undefined) {
    throw new Error("Permission is required");
  }

  // Permission 型のキーとして有効かチェック
  if (!Object.values(Permission).includes(actual.permission as Permission)) {
    throw new Error("Invalid permission");
  }

  return { permission: actual.permission as Permission };
};
