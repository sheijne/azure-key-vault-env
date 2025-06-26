---
"azkvenv": patch
---

Initial version of `kv` cli:
- Added `setup` command to help setting up the Azure CLI for usage with the `kv` cli
- Added `login` command which is an alias for `az login`
- Added `logout` command which is an alias for `az logout`
- Added `exec` command to inject vars from Azure Key Vault into the provided script
- Added `load` command to load vars from Azure Key Vault and write them to `.env`
- Added `show` command to display the environment variables for this project based on the `.env` file and the vars from the key vault
