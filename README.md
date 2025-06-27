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

# Preload environment variables from Azure Key Vaults (kv v0.0.1)                                                                                                                                                                                 2:58:16 PM
#
# USAGE kv [OPTIONS] exec|load|show|setup|login|logout
#
# OPTIONS
#
#   --cwd="."
#   --verbose
#
# COMMANDS
#
#     exec    Execute a script with preloaded environment variables from Azure Key Vault
#     load    Load environment variables from Azure Key Vault, and write them to the local .env file
#     show    Load environment variables from Azure Key Vault, and print them to the terminal
#    setup    Setup Azure CLI
#    login    Log in to Azure
#   logout    Log out of Azure
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

### Pre-configure the vault name using an environment variable

```bash
AZKVENV_VAULT_NAME=mykeyvault kv exec -- npm run dev
```

Note: you can also add it to a local `.env` file.
