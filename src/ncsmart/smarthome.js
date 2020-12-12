const vueChartDataTypeForNC = {
    dust2dot5: {
        seriesSet: [
            { name: 'outside_A', color: undefined },
            { name: 'outside_B', color: undefined },
            { name: 'room1_A', color: undefined },
            { name: 'room1_B', color: undefined },
            { name: 'room2_A', color: undefined },
            { name: 'room2_B', color: undefined },
            { name: 'room3_A', color: undefined },
            { name: 'room3_B', color: undefined },
            { name: 'livingroom_A', color: undefined },
            { name: 'livingroom_B', color: undefined },
        ],
        fieldName: 'COLDATE',
    },
    dust10: {
        seriesSet: [
            { name: '실내 거실 & 주방 미세먼지 (PM 10)', color: undefined },
            { name: '실내 방 1 미세먼지 (PM 10)', color: undefined },
            { name: '실내 방 2 미세먼지 (PM 10)', color: undefined },
            { name: '실내 방 3 미세먼지 (PM 10)', color: undefined },
            { name: '외기 미세먼지 (PM 10)', color: undefined },
        ],
        fieldName: 'COLDATE',
    },
    temp: {
        seriesSet: [
            { name: '실내 온도', color: '#ef6c00' },
            { name: '실외 온도', color: '#ff8f00' },
        ],
        fieldName: 'COLDATE',
    },
    humi: {
        seriesSet: [
            { name: '실내 습도', color: '#82b1ff' },
            { name: '실외 습도', color: '#1565c0' },
        ],
        fieldName: 'COLDATE',
    },
    co2_: {
        seriesSet: [
            { name: '실내 CO2', color: '#d05ce3' },
            { name: '실외 CO2', color: '#82b1ff' },
        ],
        fieldName: 'COLDATE',
    },
    fanRunTime: {
        seriesSet: [{ name: '환기 유닛', color: '#82b1ff' }],
    },
};

function getVueChartData(data, fieldName) {
    const resultObj = {
        max: null,
        min: null,
        data: null,
    };

    const keys = Object.keys(data[0]);
    keys.splice(keys.indexOf(fieldName), 1);

    resultObj.data = data.map((d) => {
        for (let key of keys) {
            const value = d[key];
            resultObj.max =
                resultObj.max === null
                    ? value
                    : resultObj.max < value
                    ? value
                    : resultObj.max;
            resultObj.min =
                resultObj.min === null
                    ? value
                    : resultObj.min > value
                    ? value
                    : resultObj.min;
        }

        return {
            ...d,
            COLDATE: new Date(d.COLDATE),
        };
    });

    return resultObj;
}

const MultiLineChart = {
    props: ['data', 'theme', 'max', 'min', 'seriesSet', 'fieldName'],
    template: `
        <div style="height:100%;">
            <date-value-chart 
                :theme="theme"
                :data="data"
                :series-set="seriesSet"
                :value-axis-min="min"
                :value-axis-max="max"
                :value-axis-grid-values="[]"
                :is-value-axis-disabled="false"
                :axis-label-size="15"
                :is-legend-display="false"
                :legend-size="8"
            >
                <line-series key="series"
                    :field-name="fieldName"
                    :series-stroke-width=".5"
                    :is-round="true"
                >
                    <series-tooltip key="tooltip" :size="15" tooltip-style="b"></series-tooltip>
                    <series-legend key="legend"></series-legend>
                    <gradient-series-style key="style1" :fill-opacity=".09"></gradient-series-style>
                    <series-bullets-style key="style2" :figure-size="3" stroke-color="red">
                        <!--<bullets-animation-style key="style" :scale-start=".3" :scale-end=".4"></bullets-animation-style>-->
                    </series-bullets-style>
                </line-series>
                <chart-title tag="title" key="title" text="" :font-size="10"></chart-title>
                <cursor-style key="style"></cursor-style>
                <axis-tooltip key="tooltip" :size="15"></axis-tooltip>
                <chart-exporting key="export"></chart-exporting>
            </date-value-chart>
        </div>
    `,
    components: {
        'date-value-chart': DateValueChart,
        'line-series': LineSeries,
        'series-tooltip': SeriesTooltip,
        'axis-tooltip': AxisTooltip,
        'series-legend': SeriesLegend,
        'chart-exporting': ChartExporting,
        'pie-chart': PieChart,
        'pie-series': PieSeries,
        'gradient-series-style': GradientSeriesStyle,
        'cursor-style': CursorStyle,
        'chart-title': ChartTitle,
        'series-bullets-style': SeriesBulletsStyle,
        'bullets-animation-style': BulletsAnimationStyle,
    },
};

const DashboardDust2Dot5Chart = {
    props: ['data', 'theme'],
    template: `
        <multi-line-chart
            :data="dataC"
            :theme="theme"
            :max="max"
            :min="min"
            :series-set="seriesSet"
            :fieldName="fieldName"
        />
    `,
    components: { 'multi-line-chart': MultiLineChart },
    data: function () {
        return {
            dataC: [],
            max: 0,
            min: 0,
            seriesSet: vueChartDataTypeForNC.dust2dot5.seriesSet,
            fieldName: vueChartDataTypeForNC.dust2dot5.fieldName,
        };
    },
    watch: {
        data: function (d) {
            const tmpObj = getVueChartData(d, this.fieldName);
            this.max = tmpObj.max;
            this.min = tmpObj.min;
            this.dataC = tmpObj.data;
        },
    },
};

const DashboardDust10Chart = {
    props: ['data', 'theme'],
    template: `
        <multi-line-chart
            :data="dataC"
            :max="max"
            :min="min"
            :series-set="seriesSet"
            :fieldName="fieldName"
        />
    `,
    components: { 'multi-line-chart': MultiLineChart },
    data: function () {
        return {
            dataC: [],
            max: 0,
            min: 0,
            seriesSet: vueChartDataTypeForNC.dust10.seriesSet,
            fieldName: vueChartDataTypeForNC.dust10.fieldName,
        };
    },
    watch: {
        data: function (data) {
            const tmpObj = getVueChartData(data, this.fieldName);
            this.max = tmpObj.max;
            this.min = tmpObj.min;
            this.dataC = tmpObj.data;
        },
    },
};

const DashboardTempChart = {
    props: ['data', 'theme'],
    template: `
        <multi-line-chart
            :data="dataC"
            :max="max"
            :min="min"
            :series-set="seriesSet"
            :fieldName="fieldName"
        />
    `,
    components: { 'multi-line-chart': MultiLineChart },
    data: function () {
        return {
            dataC: [],
            max: 0,
            min: 0,
            seriesSet: vueChartDataTypeForNC.temp.seriesSet,
            fieldName: vueChartDataTypeForNC.temp.fieldName,
        };
    },
    watch: {
        data: function (data) {
            const tmpObj = getVueChartData(data, this.fieldName);
            this.max = tmpObj.max;
            this.min = tmpObj.min;
            this.dataC = tmpObj.data;
        },
    },
};

const DashboardHumiChart = {
    props: ['data', 'theme'],
    template: `
        <multi-line-chart
            :data="dataC"
            :max="max"
            :min="min"
            :series-set="seriesSet"
            :fieldName="fieldName"
        />
    `,
    components: { 'multi-line-chart': MultiLineChart },
    data: function () {
        return {
            dataC: [],
            max: 0,
            min: 0,
            seriesSet: vueChartDataTypeForNC.humi.seriesSet,
            fieldName: vueChartDataTypeForNC.humi.fieldName,
        };
    },
    watch: {
        data: function (data) {
            const tmpObj = getVueChartData(data, this.fieldName);
            this.max = tmpObj.max;
            this.min = tmpObj.min;
            this.dataC = tmpObj.data;
        },
    },
};

//Date
const MultiBarChart = {
    props: ['data', 'theme', 'max', 'min', 'seriesSet', 'fieldName'],
    template: `
    <date-value-chart 
        :theme="theme"
        :data="data"
        :series-set="seriesSet"
        :value-axis-max="max"
        :value-axis-min="min"
        :value-axis-grid-values="[]"
        :is-value-axis-disabled="false"
        :axis-label-size="15"
        :is-legend-display="false"
    >
        <bar-series key="series"
            :field-name="fieldName"
            :is-stack="true"
        >
            <series-tooltip key="tooltip" :size="15" tooltip-style="b"></series-tooltip>
            <series-legend key="legend"></series-legend>
            <series-bullets-style key="style" :hover-scale="3" :figure-size=".5">
                <!--<bullets-animation-style key="style" :scale-start=".3" :scale-end=".4"></bullets-animation-style>-->
            </series-bullets-style>
        </bar-series>
        <cursor-style key="style"></cursor-style>
        <axis-tooltip key="tooltip" :size="15"></axis-tooltip>
        <chart-exporting key="export"></chart-exporting>
    </date-value-chart>
    `,
    components: {
        'date-value-chart': DateValueChart,
        'bar-series': BarSeries,
        'series-tooltip': SeriesTooltip,
        'axis-tooltip': AxisTooltip,
        'gantt-chart': GanttChart,
        'range-series': RangeSeries,
        'series-legend': SeriesLegend,
        'chart-exporting': ChartExporting,
        'cursor-style': CursorStyle,
        'chart-title': ChartTitle,
        'series-bullets-style': SeriesBulletsStyle,
        'bullets-animation-style': BulletsAnimationStyle,
    },
};

const DashboardCo2Chart = {
    props: ['data', 'theme'],
    template: `
        <multi-bar-chart
            :data="dataC"
            :max="max"
            :min="min"
            :series-set="seriesSet"
            :fieldName="fieldName"
        />
    `,
    components: { 'multi-bar-chart': MultiBarChart },
    data: function () {
        return {
            dataC: [],
            max: 0,
            min: 0,
            seriesSet: vueChartDataTypeForNC.co2_.seriesSet,
            fieldName: vueChartDataTypeForNC.co2_.fieldName,
        };
    },
    watch: {
        data: function (data) {
            const tmpObj = getVueChartData(data, this.fieldName);
            this.max = tmpObj.max;
            this.min = tmpObj.min;
            this.dataC = tmpObj.data;
        },
    },
};

const CustomGanttChart = {
    props: ['data', 'theme', 'seriesSet'],
    template: `
    <gantt-chart
        :data="data"
        :series-set="seriesSet"
        :axis-label-size="15"
        :is-category-axis-disabled="true"
        :is-today-current-range="true"
        >
            <range-series key="series" start="fromDate" end="toDate" category="name" :fillOpacity=".1">
                <series-tooltip key="tooltip" :size="10" tooltip-style="b"></series-tooltip>
            </range-series>
            <chart-exporting key="export"></chart-exporting>
    </gantt-chart>
    `,
    components: {
        'series-tooltip': SeriesTooltip,
        'gantt-chart': GanttChart,
        'range-series': RangeSeries,
        'series-legend': SeriesLegend,
        'chart-exporting': ChartExporting,
        // 'chart-title': ChartTitle,
    },
};

const DashboardFanRunTimeChart = {
    props: ['data', 'theme'],
    template: `
        <custom-gantt-chart
            :theme="theme"
            :data="data"
            :series-set="seriesSet"
        />
    `,
    components: { 'custom-gantt-chart': CustomGanttChart },
    data: function () {
        return {
            seriesSet: vueChartDataTypeForNC.fanRunTime.seriesSet,
        };
    },
};
