/**
 * @satisfies {import("citty").ArgsDef}
 */
export const sharedArgs = {
  cwd: {
    type: "string",
    default: ".",
  },
  verbose: {
    type: "boolean",
    default: false,
  },
};
