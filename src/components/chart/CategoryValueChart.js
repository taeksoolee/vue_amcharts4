const CategoryValueChart = {
    props: {
        theme: String,
        data: Array, // necessary prop
        seriesSet: Array, // necessary prop
        axisLabelSize: Number,
        valueAxisMin: Number,
        valueAxisMax: Number,
        valueAxisGridValues: Array,
        isCategoryAxisDisabled: Boolean,
        isValueAxisDisabled: Boolean,
        isLegendDisplay: Boolean,
        legendSize: Number,
        isDisplayScrollX: Boolean,
        isDisplayScrollY: Boolean,
        isDisplayScrollXY: Boolean,
    },
    template: `
        <div style="width:100%; height:100%">
            <slot></slot>
        </div>
    `,
    mounted: function () {
        this.makeChart(this.$el);
    },
    data: function () {
        return {
            chart: null,
        };
    },
    computed: {
        axisLabelSizeC: function () {
            return this.axisLabelSize === undefined ? 10 : this.axisLabelSize;
        },
        valueAxisMinC: function () {
            return this.valueAxisMin === undefined ? 0 : this.valueAxisMin;
        },
        valueAxisMaxC: function () {
            return this.valueAxisMax === undefined ? 0 : this.valueAxisMax;
        },
        legendSizeC: function () {
            return this.legendSize === undefined ? 5 : this.legendSize;
        },
    },
    methods: {
        makeChart: function (chartDiv) {
            if (this.theme === 'dark') {
                am4themes_dark !== undefined
                    ? am4core.useTheme(am4themes_dark)
                    : false;
            }

            const defaultSlots =
                this.$slots.default === undefined ? [] : this.$slots.default;

            const seriesVue = defaultSlots.find((s) => s.key === 'series');
            if (seriesVue === undefined) {
                throw Error(
                    'DateValueChart : vue component error : series component not found in child component list !!',
                );
            }

            if (this.seriesSet === undefined) {
                throw Error(
                    'CategoryValueChart : vue component error : series-set props not found !!',
                );
            }

            const createSeries = seriesVue.componentInstance.createSeries;

            const theme = this.getTheme();
            if (theme !== null) {
                am4core.useTheme(theme);
            }
            am4core.useTheme(am4themes_animated);

            this.chart = am4core.create(chartDiv, am4charts.XYChart);

            const titleVue = defaultSlots.find((s) => s.key === 'title');
            if (titleVue !== undefined) {
                titleVue.componentInstance.setTitle(this.chart);
            }

            const categoryAxis = this.chart.xAxes.push(
                new am4charts.CategoryAxis(),
            );
            categoryAxis.renderer.minGridDistance = 50;
            categoryAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;
            categoryAxis.renderer.labels.template.disabled = this.isCategoryAxisDisabled;

            const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = this.valueAxisMinC;
            valueAxis.max = this.valueAxisMaxC;
            valueAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;
            valueAxis.renderer.labels.template.disabled = this.isValueAxisDisabled;

            const tooltipVue = defaultSlots.find((s) => s.key === 'tooltip');
            if (tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(categoryAxis);
                tooltipVue.componentInstance.setTooltip(valueAxis);
            }

            let idx = 0;

            for (const { name, color } of this.seriesSet) {
                let seriesColor = this.chart.colors.getIndex(idx);

                if (color !== undefined) {
                    seriesColor = am4core.color(color);
                }

                const series = createSeries(this.chart, name, seriesColor);
                idx++;
            }

            if (this.isLegendDisplay) {
                this.chart.legend = new am4charts.Legend();
                this.chart.legend.fontSize = this.legendSizeC;
            }

            const exportVue = defaultSlots.find((s) => s.key === 'export');
            if (exportVue !== undefined) {
                exportVue.componentInstance.setExporting(this.chart);
            }

            this.chart.cursor = new am4charts.XYCursor();
            this.chart.cursor.xAxis = categoryAxis;

            const styleVues = defaultSlots.filter((s) =>
                /^.*style.*$/i.test(s.key),
            );
            for (let styleVue of styleVues) {
                styleVue.componentInstance.setStyle(this.chart);
            }

            if (this.isDisplayScrollX) {
                this.chart.scrollbarX = new am4core.Scrollbar();
            } else if (this.isDisplayScollY) {
                this.chart.scrollbarY = new am4core.Scrollbar();
            } else if (this.isDisplayScollXY) {
                this.chart.scrollbarXY = new am4core.Scrollbar();
            }

            this.chart.data = this.data;
        },
        createValueGrid(valueAxis, value) {
            let range = valueAxis.axisRanges.create();
            range.value = value;
            range.label.text = '{value}';
        },
        getTheme: function () {
            switch (this.theme) {
                case 'dataviz':
                    return am4themes_dataviz === undefined
                        ? null
                        : am4themes_dataviz;
                case 'material':
                    return am4themes_material === undefined
                        ? null
                        : am4themes_material;
                case 'kelly':
                    return am4themes_kelly === undefined
                        ? null
                        : am4themes_kelly;
                case 'dark':
                    return am4themes_dark === undefined ? null : am4themes_dark;
                case 'frozen':
                    return am4themes_frozen === undefined
                        ? null
                        : am4themes_frozen;
                case 'moonrisekingdom':
                    return am4themes_moonrisekingdom === undefined
                        ? null
                        : am4themes_moonrisekingdom;
                case 'spiritedaway':
                    return am4themes_spiritedaway === undefined
                        ? null
                        : am4themes_spiritedaway;
                default:
                    return null;
            }
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
