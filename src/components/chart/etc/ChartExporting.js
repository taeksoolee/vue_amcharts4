const ChartExporting = {
    props: {
        align: String,
        verticalAlign: String,
    },
    template: `<div></div>`,
    computed: {
        sizeC: function () {
            return this.size === undefined ? 10 : this.size;
        },
    },
    methods: {
        setExporting(chart) {
            chart.exporting.menu = new am4core.ExportMenu();

            if (this.align !== undefined) {
                chart.exporting.menu.align = this.align;
            }

            if (this.verticalAlign !== undefined) {
                chart.exporting.menu.verticalAlign = this.verticalAlign;
            }
        },
    },
};
