import * as child_process from "node:child_process";

import which from "which";

export class AZ {
  static get isInstalled() {
    return which.sync("az", { nothrow: true }) != null;
  }

  /**
   * @param {Object} [options={}]
   * @param {{ info: (message: string) => void, error: (message: string) => void }} [options.log]
   *
   * @return {void | Promise<void>}
   */
  static setup({ log } = {}) {
    if (AZ.isInstalled) {
      return;
    }

    const isMacOS = process.platform === "darwin";
    const hasBrewInstalled = which.sync("brew", { nothrow: true });

    // Non MacOS users will need to figure out how to install
    if (!isMacOS || !hasBrewInstalled) {
      throw new Error(
        "Could not install Azure CLI automatically, visit https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest for instructions on how to install it manually.",
      );
    }

    return new Promise((resolve, reject) => {
      const child = child_process.spawn("brew", ["install", "azure-cli"], {
        stdio: log ? "pipe" : "inherit",
      });

      if (log) {
        child.stdout?.on("data", (message) => log.info(String(message)));
        child.stderr?.on("data", (message) => log.error(String(message)));
      }

      child.on("close", (code) => {
        if (code !== 0) {
          return reject(
            new Error(
              "Could not install Azure CLI automatically, visit https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest for instructions on how to install it manually.",
            ),
          );
        }

        return resolve();
      });
    });
  }

  /**
   * Log in using the Azure CLI
   *
   * @returns {Promise<void>}
   */
  static login() {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn("az", ["login"], { stdio: "inherit" });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject();
        }

        return resolve();
      });
    });
  }

  /**
   * Log out using the Azure CLI
   *
   * @returns {Promise<void>}
   */
  static logout() {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn("az", ["logout"], { stdio: "inherit" });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject();
        }

        return resolve();
      });
    });
  }

  /**
   * Get the account details of the user currently authenticated with the Azure CLI
   *
   * @returns {Promise<import('./types.js').Account>}
   */
  static getAccountDetails() {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn("az", ["account", "show"]);

      /** @type {import('./types.js').Account} */
      let account;

      child.stdout.on("data", (data) => {
        account = JSON.parse(data);
      });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject();
        }

        return resolve(account);
      });
    });
  }

  /**
   * Get a list of all secrets in a vault using the Azure CLI
   *
   * @param {string} vault - the name of the key vault
   *
   * @returns {Promise<import("./types.js").Secret[]>}
   */
  static listAllSecrets(vault) {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn("az", [
        "keyvault",
        "secret",
        "list",
        "--vault-name",
        vault,
      ]);

      /** @type {import("./types.js").Secret[]} */
      let secrets;

      child.stdout.on("data", (data) => {
        secrets = JSON.parse(data);
      });

      child.stderr.on("data", (data) => {
        console.error(String(data));
      });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject(new Error("Failed to fetch list of secrets"));
        }

        return resolve(secrets);
      });
    });
  }

  /**
   * Get the details, specifically the value, of a secret using the Azure CLI
   *
   * @param {string} vault - the name of the key vault
   * @param {string} secretName - the name of the secret to fetch details for
   *
   * @returns {Promise<import("./types.js").SecretDetails>}
   */
  static getSecretDetails(vault, secretName) {
    return new Promise((resolve, reject) => {
      const child = child_process.spawn("az", [
        "keyvault",
        "secret",
        "show",
        "--vault-name",
        vault,
        "--name",
        secretName,
      ]);

      /** @type {import("./types.js").SecretDetails} */
      let secret;

      child.stdout.on("data", (data) => {
        secret = JSON.parse(data);
      });

      child.stderr.on("data", (data) => {
        console.error(String(data));
      });

      child.on("close", (code) => {
        if (code !== 0) {
          return reject(
            new Error(`Failed to fetch secret value for "${secretName}"`),
          );
        }

        return resolve(secret);
      });
    });
  }
}
