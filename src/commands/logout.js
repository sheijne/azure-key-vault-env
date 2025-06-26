import { defineCommand } from "citty";
import { AZ } from "../core/azure/azure.js";

export const command = defineCommand({
  meta: {
    name: "logout",
    description: "Log out of Azure",
  },
  async run() {
    await AZ.logout();
  },
});
