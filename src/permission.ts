export const Permission = {
  READ: "READ",
  MUTATE: "MUTATE",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
