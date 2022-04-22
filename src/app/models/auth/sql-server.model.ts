export class ImportFileToTableBindingModel {
    ConnectionStringId!: string;
    Schema!: string;
    NewTableName!: string;
    OldTableName!: string;
    AppendData!: boolean;
    FieldArray!: FieldArrayModel[];
    AddedBy!: string;
    AddedDate!: Date;
    UpdatedBy!: string;
    UpdatedDate!: Date;
}

export class FieldArrayModel {
    ColumnName!: string
    DataType!: string
    IsPrimaryKey!: boolean
    IsNullAble!: boolean
}
