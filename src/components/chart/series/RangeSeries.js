const RangeSeries = {
    props: {
        category: String, // necessary prop
        start: String, // necessary prop
        end: String, // necessary prop
        fillOpacity: Number,
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
        createSeries: function (chart) {
            const series = chart.series.push(new am4charts.ColumnSeries());
            series.columns.template.width = am4core.percent(80);

            series.dataFields.openDateX = this.start;
            series.dataFields.dateX = this.end;
            series.dataFields.categoryY = this.category;
            series.columns.template.propertyFields.fill = 'color';
            series.columns.template.propertyFields.stroke = 'color';

            series.fillOpacity = this.fillOpacityC;

            const defaultSlots =
                this.$slots.default === undefined ? [] : this.$slots.default;

            const tooltipVue = defaultSlots.find((s) => s.key === 'tooltip');
            if (tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(
                    series,
                    'color',
                    '{name}: {openDateX} - {dateX}',
                    true,
                );
            }
        },
    },
};
