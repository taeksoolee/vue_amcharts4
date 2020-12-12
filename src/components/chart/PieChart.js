const PieChart = {
    props: {
        data: Array, // necessary prop
        valueName: String, // necessary prop
        categoryName: String, // necessary prop
        colorSet: Object,
        isLegendDisplay: Boolean,
        legendSize: Number,
    },
    template: `
        <div style="width:100%; height:100%">
            <slot></slot>
        </div>
    `,
    mounted: function () {
        if (this.valueName === undefined) {
            throw Error(
                'PieChart : vue component error : value-name props not found !!',
            );
        }

        if (this.categoryName === undefined) {
            throw Error(
                'PieChart : vue component error : category-name props not found !!',
            );
        }

        this.defaultSlots = this.$slots.default;

        this.makeChart(this.$el);
    },
    data: function () {
        return {
            chart: null,
            seriesColorMap: {},
            dateAxis: null,
        };
    },
    computed: {
        axisLabelSizeC: function () {
            return this.axisLabelSize === undefined ? 20 : this.axisLabelSize;
        },
        colorSetC: function () {
            const colorSetC = {};
            for (let key in this.colorSet) {
                colorSetC[key] = am4core.color(this.colorSet[key]);
            }
            return colorSetC;
        },
        legendSizeC: function () {
            return this.legendSize === undefined ? 10 : this.legendSize;
        },
    },
    methods: {
        makeChart: function (chartDiv) {
            if (this.theme === 'dark') {
                am4themes_dark !== undefined
                    ? am4core.useTheme(am4themes_dark)
                    : false;
            }

            const seriesVue = this.defaultSlots.find((s) => s.key === 'series');
            if (seriesVue === undefined) {
                throw Error(
                    'DateValueChart : vue component error : series component not found in child component list !!',
                );
            }

            const createSeries = seriesVue.componentInstance.createSeries;

            am4core.useTheme(am4themes_animated);
            this.chart = am4core.create(chartDiv, am4charts.PieChart);

            const titleVue = this.defaultSlots.find((s) => s.key === 'title');
            if (titleVue !== undefined) {
                titleVue.componentInstance.setTitle(this.chart);
            }

            const tooltipVue = this.defaultSlots.find(
                (s) => s.key === 'tooltip',
            );
            if (tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(dateAxis);
                tooltipVue.componentInstance.setTooltip(valueAxis);
            }

            if (this.isLegendDisplay) {
                this.chart.legend = new am4charts.Legend();
                this.chart.legend.fontSize = this.legendSizeC;
            }

            const exportVue = this.defaultSlots.find((s) => s.key === 'export');
            if (exportVue !== undefined) {
                exportVue.componentInstance.setExporting(this.chart);
            }

            const series = createSeries(
                this.chart,
                this.valueName,
                this.categoryName,
            );

            this.chart.hiddenState.properties.radius = am4core.percent(0);

            let chartData = [];

            let cnt = 0;
            if (this.colorSet !== undefined && this.data !== null) {
                series.slices.template.propertyFields.fill = 'color';
                series.slices.template.propertyFields.stroke = 'color';

                for (let data of this.data) {
                    let color = this.colorSetC[data[this.categoryName]];
                    if (color === undefined) {
                        color = this.chart.colors.getIndex(cnt);
                        cnt++;
                    } else {
                        color = color;
                    }

                    chartData.push({
                        ...data,
                        color: color,
                    });
                }
            } else {
                chartData = this.data;
            }

            this.chart.data = chartData;
        },
    },
    watch: {
        data: function (data) {
            if (this.chart === null) return;
            this.chart.dispose();

            while (!this.chart.isDisposed()) {
                break;
            }

            this.makeChart(this.$el);
        },
    },
};
