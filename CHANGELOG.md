# azkvenv

## 0.0.3

### Patch Changes

- a26e028: Updated dotenv from 16.6.0 to 17.2.0
- 51b4ba3: - Removed dependency to `pkg-types`
  - Source now imports package.json directly so it gets included in the binary.
- 2c64428: Build now targets apple silicon when building binary. Support for other architectures might get added in the future.

## 0.0.2

### Patch Changes

- 555b47d: Now using prebuilt binary instead of source, prevents users from needing to install bun
- 657f657: Added handling of `AZKVENV` environment variable to pre-configure the vault name used by `kv`
- 8b533f6: `kv --help` now shows the correct description for the `kv setup` command

## 0.0.1

### Patch Changes

- 67e2942: Initial version of `kv` cli:
  - Added `setup` command to help setting up the Azure CLI for usage with the `kv` cli
  - Added `login` command which is an alias for `az login`
  - Added `logout` command which is an alias for `az logout`
  - Added `exec` command to inject vars from Azure Key Vault into the provided script
  - Added `load` command to load vars from Azure Key Vault and write them to `.env`
  - Added `show` command to display the environment variables for this project based on the `.env` file and the vars from the key vault
