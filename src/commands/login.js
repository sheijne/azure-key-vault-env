import { defineCommand } from "citty";
import { AZ } from "../core/azure/azure.js";

export const command = defineCommand({
  meta: {
    name: "login",
    description: "Log in to Azure",
  },
  async run() {
    await AZ.login();
  },
});
