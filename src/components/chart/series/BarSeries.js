const BarSeries = {
    props: {
        fieldName: String, // necessary prop
        fillOpacity: Number,
        isStack: Boolean,
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        fillOpacityC: function () {
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
    },
    methods: {
        createSeries: function (chart, seriesName, seriesColor) {
            if (this.fieldName === undefined) {
                throw Error(
                    'BarSeries : vue component error : field-name props not found !!',
                );
            }

            const series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.dateX = this.fieldName;
            series.dataFields.valueY = seriesName;

            series.stacked = this.isStack;

            series.stroke = seriesColor;
            series.fill = seriesColor;
            series.fillOpacity = this.fillOpacityC;

            const defaultSlots =
                this.$slots.default === undefined ? [] : this.$slots.default;

            const styleVues = defaultSlots.filter((s) =>
                /^.*style.*$/i.test(s.key),
            );
            for (let styleVue of styleVues) {
                styleVue.componentInstance.setStyle(series);
            }

            const tooltipVue = defaultSlots.find((s) => s.key === 'tooltip');
            if (tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(
                    series,
                    seriesColor,
                    seriesName + ' : {valueY}',
                );
            }

            const legendVue = defaultSlots.find((s) => s.key === 'legend');
            if (legendVue !== undefined) {
                legendVue.componentInstance.setLegend(series, seriesName);
            }

            testTemp = series;
            return series;
        },
    },
};
var testTemp = null;
