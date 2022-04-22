export class CustomQueryBindingModel {
    ConnectionStringId!: string;
    TableName!: string;
    Functions!: Functions[];
    GroupBy!: GroupBy[];
    SortBy!: SortBy[];
    FilterBy!: FilterBy[];
}

export class Functions {
    Id!: string;
    ColumnName!: string;
    Function!: string;
}
export class SortBy {
    Id!: string;
    ColumnName!: string;
    SortType!: string;
}
export class GroupBy {
    Id!: string;
    ColumnName!: string;
}
export class FilterBy {
    ColumnName!: string;
    FilterOperator!: string;
    FilterValue!: string;
}

export class SaveCustomQueryBindingModel {
    CustomQueryId!: string;
    CconnectionStringId!: string;
    TableName!: string;
    CustomQueryName!: string;
    Functions!: Functions[];
    GroupBy!: GroupBy[];
    SortBy!: SortBy[];
    FilterBy!: FilterBy[];
    ChartName1!: string;
    ChartName2!: string;
    ChartName3!: string;
    ChartName4!: string;
    xAxis1!: string;
    xAxis2!: string;
    xAxis3!: string;
    xAxis4!: string;
    yAxis1!: string;
    yAxis2!: string;
    yAxis3!: string;
    yAxis4!: string;
    ChartType1!: string;
    ChartType2!: string;
    ChartType3!: string;
    ChartType4!: string;
    AddedBy!: string;
    AddedDate!: Date;
    UpdatedBy!: string;
    UpdatedDate!: Date;
}