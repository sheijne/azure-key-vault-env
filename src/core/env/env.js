import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

import * as dotenv from "dotenv";

import { AZ } from "../azure/azure.js";

export class Env {
  /**
   * Parses a newline delimited list of environment variables (like in a .env file) to a record.
   *
   * @param {string | Buffer} env - a newline delimited list of environment variables
   *
   * @returns {Record<string, string>} a record with the parsed environment variables
   */
  static parse(env) {
    return dotenv.parse(env);
  }

  /**
   * Turns a record of environment variables into a newline delimited list (like in a .env file).
   *
   * @param {Record<string, string>} env - a record of environment variables to stringify
   *
   * @returns {string} the stringified environment variables
   */
  static stringify(env) {
    let contents = "";

    for (const key in env) {
      contents += `${key}="${env[key]}"\n`;
    }

    return contents;
  }

  /**
   * Get the resolved path to the .env file
   *
   * @param {string} [cwd=process.cwd()] - an optional path to resolve the .env file from
   */
  static resolveDotEnv(cwd = process.cwd()) {
    return path.resolve(cwd, ".env");
  }

  /**
   * Gets the environments variables from a file and parses it into a record.
   * Returns an empty record when the file does not exist.
   *
   * @param {string} filepath - the path to the .env file
   *
   * @returns {Record<string, string>} a record of parsed environment variables from the .env file
   */
  static readFile(filepath) {
    if (!fs.existsSync(filepath)) {
      return {};
    }

    return Env.parse(fs.readFileSync(filepath));
  }

  /**
   * Write the provided environment variables to the specified .env file.
   *
   * @param {string} filepath - the path to the .env file
   * @param {Record<string, string>} env - a record of environment variables
   *
   * @returns {void}
   */
  static writeFile(filepath, env) {
    return fs.writeFileSync(filepath, Env.stringify(env));
  }

  /**
   * Read env variables from specified key vault
   *
   * @param {string} vault - the name of the key vault
   *
   * @returns {Promise<Record<string, string>>} a record of environment variables from the key vault
   */
  static readKeyVault(vault) {
    return AZ.listAllSecrets(vault)
      .then((secrets) =>
        Promise.all(
          secrets.map((secret) => AZ.getSecretDetails(vault, secret.name)),
        ),
      )
      .then((secrets) =>
        Object.fromEntries(
          secrets.map((secret) => [
            secret.name.replace(/-/g, "_").toUpperCase(),
            secret.value,
          ]),
        ),
      );
  }
}
