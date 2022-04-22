export class Containers {
  name!: string;
  isDeleted!: boolean
}

export class SynapseDatabases {
  DatabaseName!: string
}
export class SynapseExternalTable {
  ExternalTableName!: string
}

export class ExternalTableinfoBindingModel {
  DatabaseName!: string;
  ExternalTableName!: string
}

export class ExternalTableProfileBindingModel {

  Database!: string
  Table!: string
  Columns!: string[]
}

export class CreateQueriesBindingModel {
  QueryName!: string
  QueryDescription!: string
  QuerySQL!: string
  DatabaseName!: string
  DBConnection!: string

  AddedBy!: string
  AddedDate!: Date
  UpdatedBy!: string
  UpdatedDate!: Date
}

export class ExecuteQueryBindingModel {
  ConnectionStringId!: string
  DatabaseName!: string
  QuerySQL!: string
  AddedBy!: string
}

export class TableRowUpdateBindingModel {
  ConnectionStringId!: string
  TableName!: string
  RowData!: string
  AddedBy!: string
  AddedDate!: Date
  UpdatedBy!: string
  UpdatedDate!: Date
}

export class QueryOutput {
  connectionStringId!: string
  queryId!: string
  queryName!: string
  queryDescription!: string
  querySQL!: string
  queryOutput!: boolean
  databaseName!: string
  queryExecutionEndDateTime!: Date
  addedBy!: string
  addedDate!: Date
}

export class QueryScheduleBindingModel {
  QueryId!: string
  ScheduledStartDateTime!: Date
  FrequencyNumber!: number

  AddedBy!: string
  AddedDate!: Date
}

export class Queries {
  QueryId!: string
  QueryName!: string
  QueryDescription!: string
  QuerySQL!: string
  DBConnection!: string
  AddedBy!: string
  AddedDate!: Date
  UpdatedBy!: string
  UpdatedDate!: Date
}

export class ExternalTableInfo {
  COLUMN_NAME!: string;
  ORDINAL_POSITION!: number;
  IS_NULLABLE!: string;
  DATA_TYPE!: SVGStringList;
}

export class EXternalTableProfile {
  ColumnName!: string
  Count!: number
  Distinct!: number
  Null!: number
}

export class DataTypes {
  dataType!: string;
  minAllowedLength!: number;
  maxAllowedLength!: number;
}

export class Blobs {
  name!: string;
  owner!: string;
  isDirectory!: boolean;
  contentLength!: number;
  lastModified!: Date;
  leaseState!: number
}

export class CreateFileAndTableSchemaBindingModel {
  ConnectionStringId!: string
  Schema!: string
  NewTableName!: string
  OldTableName!: string
  FileData!: File
}

export class CheckBlobSchema {
  ConnectionStringId!: string
  FileSystem!: string;
  Path_Blob!: string
}

export class BlobSchema {
  columnName!: string;
  columnType!: string;
  dataType!: string
}

export class CreateViewBinding {
  FileSystem!: string;
  Path_Blob!: string;
  Name!: string;
  FieldArray!: FieldArray[];
}

export class CreateExternalTableBinding {
  FileSystem!: string;
  Path_Blob!: string;
  Name!: string;
  FieldArray!: FieldArray[];
}
export class FieldArray {
  ColumnName!: string;
  AliasName!: string;
  ColumnType!: string;
  DataType!: string
}

export class CreateDefaultViewBindingModel {
  ConnectionStringId!: string;
  FileSystem!: string;
  Path_Blob!: string;
  Name!: string;
}

export class ReviewProfileOutputBindingModel {
  DatabaseName!: string;
  ExternalTableName!: string;
  ProfiledDate!: Date;
}

