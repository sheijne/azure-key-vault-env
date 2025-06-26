import { defineCommand } from "citty";
import { AZ } from "../core/azure/azure.js";
import { sharedArgs } from "../shared-args.js";
import { intro, log, outro } from "@clack/prompts";

export const command = defineCommand({
  meta: {
    name: "setup",
    description: "Log in to Azure",
  },
  args: {
    ...sharedArgs,
  },
  async run({ args }) {
    if (args.verbose) {
      intro("Setting up Azure CLI");
    }

    if (!AZ.isInstalled) {
      if (args.verbose) {
        log.info("Installing Azure CLI");
      }

      await AZ.setup({ log: args.verbose ? log : undefined });
    }

    if (args.verbose) {
      log.info("Authenticating with Azure CLI");
    }

    const account = await AZ.getAccountDetails().catch(() =>
      AZ.login().then(() => AZ.getAccountDetails()),
    );

    if (args.verbose) {
      log.info(`Logged in as: ${JSON.stringify(account, null, "  ")}`);
      outro("All setup, and good to go");
    }
  },
});
