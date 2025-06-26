import { intro, outro, spinner } from "@clack/prompts";
import { defineCommand } from "citty";

import { Env } from "../core/env/env.js";
import { sharedArgs } from "../shared-args.js";

export const command = defineCommand({
  meta: {
    name: "load",
    description:
      "Load environment variables from Azure Key Vault, and write them to the local .env file",
  },
  args: {
    ...sharedArgs,
    vault: {
      type: "string",
      required: true,
    },
  },
  async run({ args }) {
    if (args.verbose) {
      intro("Preparing env");
    }

    const s = spinner();

    if (args.verbose) {
      s.start("Reading from .env");
    }

    const envFromFile = Env.readFile(Env.resolveDotEnv(args.cwd));

    if (args.verbose) {
      s.message("Reading from key vault");
    }

    const envFromKeyVault = await Env.readKeyVault(args.vault);

    if (args.verbose) {
      s.message("Writing .env");
    }

    const env = Object.assign({}, envFromFile, envFromKeyVault);

    Env.writeFile(Env.resolveDotEnv(args.cwd), env);

    if (args.verbose) {
      s.stop("Updated .env");
    }

    if (args.verbose) {
      outro("Done!");
    }
  },
});
