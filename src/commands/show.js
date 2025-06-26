import { defineCommand } from "citty";

import { Env } from "../core/env/env.js";
import { sharedArgs } from "../shared-args.js";

export const command = defineCommand({
  meta: {
    name: "show",
    description:
      "Load environment variables from Azure Key Vault, and print them to the terminal",
  },
  args: {
    ...sharedArgs,
    vault: {
      type: "string",
      required: true,
    },
    format: {
      type: "string",
      valueHint: "json|text",
      default: "json",
    },
  },
  async run({ args }) {
    const envFromFile = Env.readFile(Env.resolveDotEnv(args.cwd));

    const envFromKeyVault = await Env.readKeyVault(args.vault);

    const env = Object.assign({}, envFromKeyVault, envFromFile);

    console.log(args.format === "text" ? Env.stringify(env).trim() : env);
  },
});
