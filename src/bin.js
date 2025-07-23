#!/usr/bin/env bun
import { defineCommand, runMain } from "citty";
import pkg from "../package.json";
import { sharedArgs } from "./shared-args.js";

const main = defineCommand({
  meta: {
    name: Object.keys(/** @type {Record<string, string>} */ (pkg.bin))[0],
    version: pkg.version,
    description: pkg.description,
  },
  args: {
    ...sharedArgs,
  },
  subCommands: {
    exec: () => import("./commands/exec.js").then((module) => module.command),
    load: () => import("./commands/load.js").then((module) => module.command),
    show: () => import("./commands/show.js").then((module) => module.command),
    setup: () => import("./commands/setup.js").then((module) => module.command),
    login: () => import("./commands/login.js").then((module) => module.command),
    logout: () =>
      import("./commands/logout.js").then((module) => module.command),
  },
});

runMain(main);
