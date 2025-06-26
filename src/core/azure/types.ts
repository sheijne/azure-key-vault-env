export type ISODateString =
  `${number}-${number}-${number}T${number}:${number}:${number}+${number}:${number}`;
export type UID = `${string}-${string}-${string}-${string}-${string}`;

export interface Account {
  environmentName: string;
  homeTenantId: UID;
  id: UID;
  isDefault: boolean;
  managedByTenants: unknown[];
  state: string;
  tenantDefaultDomain: string;
  tenantDisplayName: string;
  tenantId: UID;
  name: string;
  user: {
    name: string;
    type: string;
  };
}

export interface Secret {
  attributes: {
    created: ISODateString;
    enabled: boolean;
    expires: unknown;
    notBefore: unknown;
    recoverableDays: number;
    recoveryLevel: string;
    updated: ISODateString;
  };
  contentType: unknown;
  id: string;
  managed: unknown;
  name: string;
  tags: Record<string, unknown>;
}

export interface SecretDetails extends Secret {
  kid: unknown;
  value: string;
}
