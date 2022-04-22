export class SqlServerConnectionStringBindingModel {
    ConnectionStringId!: string;
    ConnectionName!: string;
    ServerName!: string;
    Username!: string;
    Password!: string;
    CreatedBy!: string;
    CreatedDate!: Date;
    UpdatedBy!: string;
    UpdatedDate!: Date;
}
export class StorageConnectionStringBindingModel {
    ConnectionStringId!: string;
    ConnectionName!: string;
    StorageName!: string;
    SAS!: string;
    CreatedBy!: string;
    CreatedDate!: Date;
    UpdatedBy!: string;
    UpdatedDate!: Date;
}

export class SynapseConnectionStringBindingModel {
    ConnectionStringId!: string;
    ConnectionName!: string;
    ServerPoolName!: string;
    Username!: string;
    Password!: string;
    CreatedBy!: string;
    CreatedDate!: Date;
    UpdatedBy!: string;
    UpdatedDate!: Date;
}
