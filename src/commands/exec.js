import * as child_process from "node:child_process";
import * as path from "node:path";

import { intro, outro, spinner } from "@clack/prompts";
import { defineCommand } from "citty";

import { Env } from "../core/env/env.js";
import { sharedArgs } from "../shared-args.js";

export const command = defineCommand({
  meta: {
    name: "exec",
    description:
      "Execute a script with preloaded environment variables from Azure Key Vault",
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
      s.stop("Loaded environment");
    }

    const env = Object.assign({}, process.env, envFromKeyVault, envFromFile);

    if (args.verbose) {
      outro(`Running "${args._.join(" ")}"`);
    }

    const [bin, ...binArgs] = args._;

    if (bin === undefined) {
      throw new Error("Provide a script to run ie. `kv exec -- echo 'test'`");
    }

    const child = child_process.spawn(bin, binArgs, {
      stdio: "inherit",
      cwd: path.resolve(args.cwd),
      env,
    });

    child.on("close", (code) => {
      process.exit(code);
    });
  },
});
