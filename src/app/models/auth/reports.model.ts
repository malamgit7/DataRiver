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

export class ChartInfo {
    Id!: string;
    ChartName!: string;
    ChartType!: string;
    OptionsPluginsTitleDisplay!: boolean;
    OptionsPluginsTitleText!: string;
    OptionsPluginsTitleColor!: string;
    OptionsPluginsTitlePosition!: string;
    OptionsPluginsTitleAlign!: string;
    OptionsPluginsTitleFontSize!: number;
    OptionsPluginsTitleFontStyle!: string;
    OptionsPluginsTitleFontWeight!: string;
    OptionsPluginsTitlePaddingTop!: number;
    OptionsPluginsTitlePaddingBottom!: number;

    OptionsPluginsSubtitleDisplay!: boolean;
    OptionsPluginsSubtitleText!: string;
    OptionsPluginsSubtitleColor!: string;
    OptionsPluginsSubtitlePosition!: string;
    OptionsPluginsSubtitleAlign!: string;
    OptionsPluginsSubtitleFontSize!: number;
    OptionsPluginsSubtitleFontStyle!: string;
    OptionsPluginsSubtitleFontWeight!: string;
    OptionsPluginsSubtitlePaddingTop!: number;
    OptionsPluginsSubtitlePaddingBottom!: number;

    BarOptionsIndexAxis!: string;
    BarOptionsScalesXYStacked!: boolean;

    BarLineOptionsScalesXYTitleDisplay!: boolean;
    BarLineOptionsScalesXTitleText!: string;
    BarLineOptionsScalesYTitleText!: string;

    BarLineOptionsScalesXYTitleFontSize!: number;
    BarLineOptionsScalesXYTitleFontStyle!: string;
    BarLineOptionsScalesXYTitleFontWeight!: string;

    BarLineOptionsScalesXYTitleColor!: string;
    BarLineOptionsScalesXYTicksColor!: string;
    BarLineOptionsScalesXYGridColor!: string;

    RadarOptionsScalesRPointlabelsColor!: string;
    RadarOptionsScalesRAnglelinesColor!: string;
    RadarPolarareaOptionsScalesRGridColor!: string;

    ChartXAxis!: string;
    ChartYAxisInfo!: ChartYAxisInfo[];
    FinalChartData!: string;
    FinalChartOptions!: string;
}

export class ChartYAxisInfo {
    Id!: string;
    ChartYAxis!: string;
    ChartYAxisFunction!: string;
    LineBarRadarPolarDatasetsLabel!: string;
    LineBarRadarDatasetsBackgroundColor!: string;
    LineDatasetsFill!: boolean;
    LineDatasetsBorderDash!: string;  // [10, 5] This field needs to be an array of numbers but string for now
    LineDatasetsTension!: number;
    LineRadarDatasetsBorderColor!: string;
    RadarDatasetsPointBackgroundColor!: string;
    RadarDatasetsPointBorderColor!: string;
    RadarDatsetsPointHoverBackgroundColor!: string;
    RadarDatasetsPointHoverBorderColor!: string;
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
    ChartInfo!: ChartInfo[];
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