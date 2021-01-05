const Dust10Chart = {
  props: ['data', 'theme'],
  template: `
		<multi-line-chart
			:data="data"
			:theme="theme"
			:series-set="seriesSet"
			:fieldName="fieldName"
		/>
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.dust10.seriesSet,
      fieldName: vueChartDataTypeForNC.dust10.fieldName,
    };
  },
};

const DashboardDust10Chart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
        :data="data"
        :theme="theme"
        :series-set="seriesSet"
        :fieldName="fieldName"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.dust10.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.dust10.fieldName,
    };
  },
};

// pie 차트 사용 예
const DashboardCompareBarChart = {
  props: ['data', 'title'],
  template: `
        <pie-chart-a
            :data="data"
            :title="title"
            category-name="div"
            value-name="value"
            :color-set="colorSet"
        />
    `,
  data: function () {
    return {
      colorSet: {
        temp_outside: '#999',
        temp_inside: '#888',
        temp_outside: '#777',
        temp_inside: '#666',
      },
    };
  },
  components: {
    'pie-chart-a': PieChartA,
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
  </gantt-chart>
  `,
  components: {
    'series-tooltip': SeriesTooltip,
    'gantt-chart': GanttChart,
    'range-series': RangeSeries,
    'series-legend': SeriesLegend,
    // 'chart-exporting': ChartExporting,
    // 'chart-title': ChartTitle,
  },
};

const DashboardCompareChart = {
  props: ['data', 'theme'],
  template: `
		<multi-line-chart
			:data="data"
			:series-set="seriesSet"
			:fieldName="fieldName"
		/>
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.compare.seriesSet,
      fieldName: vueChartDataTypeForNC.compare.fieldName,
    };
  },
};
