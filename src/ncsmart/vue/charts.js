const MultiLineChart = {
  props: [
    'data',
    'theme',
    'seriesSet',
    'fieldName',
    'isLegendDisplay',
    'isExportingDisplay',
  ],
  template: `
    <div style="height:100%;">
			<date-value-chart 
				:theme="theme"
				:data="data"
				:series-set="seriesSet"
				:value-axis-min="valueAxisData.min"
				:value-axis-max="valueAxisData.max"
				:value-axis-grid-values="[]"
				:is-value-axis-disabled="false"
				:axis-label-size="15"
				:is-legend-display="isLegendDisplay"
        :legend-size="15"
        :base-interval="{ timeUnit: 'minute', count: 1 }"
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
			<chart-exporting v-if="isExportingDisplay" key="export" />
			</date-value-chart>
		</div>
	`,
  mounted: function () {
    console.info(this.isExportingDisplay);
  },
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
  computed: {
    valueAxisData: function () {
      let max = 10;
      let min = 0;
      this.data.forEach(function (d) {
        for (const key in d) {
          const value = parseFloat(d[key]);
          if (!isNaN(value)) {
            max = value > max ? value : max;
            min = value < min ? value : min;
          }
        }
      });

      return {
        max,
        min,
      };
    },
  },
};

const MultiBarChart = {
  props: [
    'data',
    'theme',
    'seriesSet',
    'fieldName',
    'isStack',
    'valueAxisMax',
    'valueAxisMin',
  ],
  template: `
  <date-value-chart 
		:theme="theme"
		:data="data"
		:series-set="seriesSet"
		:value-axis-max="valueAxisMax"
		:value-axis-min="valueAxisMin"
		:value-axis-grid-values="[]"
		:is-value-axis-disabled="false"
		:axis-label-size="15"
		:is-legend-display="false"
  >
		<bar-series key="series"
			:field-name="fieldName"
			:is-stack="isStack"
		>
			<series-tooltip key="tooltip" :size="15" tooltip-style="b"></series-tooltip>
			<series-legend key="legend"></series-legend>
			<series-bullets-style key="style" :hover-scale="3" :figure-size=".5" stroke-color="white">
				<!--<bullets-animation-style key="style" :scale-start=".3" :scale-end=".4"></bullets-animation-style>-->
			</series-bullets-style>
		</bar-series>
		<cursor-style key="style"></cursor-style>
		<axis-tooltip key="tooltip" :size="15"></axis-tooltip>
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
    // 'chart-exporting': ChartExporting,
    'cursor-style': CursorStyle,
    'chart-title': ChartTitle,
    'series-bullets-style': SeriesBulletsStyle,
    'bullets-animation-style': BulletsAnimationStyle,
  },
  computed: {
    valueAxisData: function () {
      let max = 100;
      let min = 0;

      const maxObj = {};
      this.data.forEach(function (d) {
        let tmpMax = 0;
        for (const key in d) {
          const value = parseFloat(d[key]);
          if (!isNaN(value)) {
            tmpMax += value;
          }
        }
        max = tmpMax > max ? tmpMax : max;
      });

      return {
        max,
        min,
      };
    },
  },
};

const MultiBarCategoryChart = {
  props: [
    'data',
    'theme',
    'seriesSet',
    'fieldName',
    'isStack',
    'valueAxisMax',
    'valueAxisMin',
    'isLegendDisplay',
    'fillOpacity',
    'isStroke',
  ],
  template: `
    <category-value-chart 
      :theme="theme"
      :data="data"
      :series-set="seriesSet"
      :value-axis-max="valueAxisMax"
      :value-axis-min="valueAxisMin"
      :value-axis-grid-values="[]"
      :is-value-axis-disabled="false"
      :axis-label-size="15"
      :is-legend-display="isLegendDisplay"
      :legend-size="15"
    >
      <bar-series key="series"
        x-axis-type="category"
				:field-name="fieldName"
        :is-stack="isStack"
        :is-stroke="isStroke"
        :fill-opacity="fillOpacityC"
      >
				<series-tooltip key="tooltip" :size="15" tooltip-style="b"></series-tooltip>
				<series-legend key="legend"></series-legend>
				<series-bullets-style key="style" :hover-scale="3" :figure-size=".5" stroke-color="white">
					<!--<bullets-animation-style key="style" :scale-start=".3" :scale-end=".4"></bullets-animation-style>-->
				</series-bullets-style>
      </bar-series>
      <cursor-style key="style"></cursor-style>
      <axis-tooltip key="tooltip" :size="15"></axis-tooltip>
    </category-value-chart>
    `,
  components: {
    'category-value-chart': CategoryValueChart,
    'bar-series': BarSeries,
    'series-tooltip': SeriesTooltip,
    'axis-tooltip': AxisTooltip,
    'gantt-chart': GanttChart,
    'range-series': RangeSeries,
    'series-legend': SeriesLegend,
    // 'chart-exporting': ChartExporting,
    'cursor-style': CursorStyle,
    'chart-title': ChartTitle,
    'series-bullets-style': SeriesBulletsStyle,
    'bullets-animation-style': BulletsAnimationStyle,
  },
  computed: {
    fillOpacityC: function () {
      return typeof this.fillOpacity === 'undefined' ? 1 : this.fillOpacity;
    },
  },
};

const PieChartA = {
  props: ['data', 'valueName', 'categoryName', 'colorSet', 'title', 'theme'],
  template: `
		<pie-chart
			style=" width: 100%;height: 100%;"
			:data="data"
			:value-name="valueName"
			:category-name="categoryName"
			:color-set="colorSet"
      :is-legend-display="true"
      :legend-size="15"
      :theme="theme"
		>
			<chart-title tag="title" key="title" :text="title" :font-size="10"></chart-title>
			<pie-series key="series">
				<series-tooltip key="tooltip" :size="10" tooltip-style="b"></series-tooltip>
				<series-legend key="legend"></series-legend>
			</pie-series>
		</pie-chart>
  `,
  components: {
    'pie-chart': PieChart,
    'chart-title': ChartTitle,
    'pie-series': PieSeries,
    'series-tooltip': SeriesTooltip,
    'series-legend': SeriesLegend,
  },
};
