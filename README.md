# azkvenv

CLI utility to automatically load environment variables from Azure Key Vaults

## Installation

```bash
# Install as a devDependency
npm install --save-dev azkvenv

# Or make the binary available globally
npm install --global azkvenv
```

## Usage

```bash
kv --help

# USAGE kv [OPTIONS] exec|load|show
#
# OPTIONS
#
#       --cwd="."
#   -v, --verbose
#
# COMMANDS
#
#   exec    Execute a script with preloaded environment variables from Azure Key Vault
#   load    Load environment variables from Azure Key Vault, and write them to the local .env file
#   show    Load environment variabels from Azure Key Vault, and print them to the terminal
#
# Use kv <command> --help for more information about a command.
```

### Running a script with preloaded environment

```bash
kv exec --vault <vault_name> -- npm run dev
```

### Setting up an npm script with preloaded environment

```json
{
  "name": "homepage",
  "scripts": {
    "dev": "kv exec --vault <vault_name> -- vite"
  }
}
```
