export const Role = {
  PROJECT_ADMINISTRATOR: "PROJECT_ADMINISTRATOR",
  ADMINISTRATOR: "ADMINISTRATOR",
  NORMAL_USER: "NORMAL_USER",
  REPORTER: "REPORTER",
  GUEST_REPORTER: "GUEST_REPORTER",
  ALL: "ALL",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
