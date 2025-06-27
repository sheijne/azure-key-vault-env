/** @import { ArgsDef, StringArgDef } from "citty" */
import { Env } from "./core/env/env.js";

/** @satisfies {ArgsDef} */
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

export const vault = () => {
  const env = Object.assign({}, process.env, Env.readFile(Env.resolveDotEnv()));

  const defaultVault = env["AZKVENV_VAULT_NAME"];

  if (defaultVault) {
    return /** @satisfies {StringArgDef} */ ({
      type: "string",
      default: defaultVault,
    });
  }

  return /** @satisfies {StringArgDef} */ ({
    type: "string",
    required: true,
  });
};
