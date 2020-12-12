const AxisTooltip = {
    props: {
        size: Number,
    },
    template: `<div></div>`,
    computed: {
        sizeC: function () {
            return this.size === undefined ? 10 : this.size;
        },
    },
    methods: {
        setTooltip(axis) {
            axis.tooltip.background.fill = am4core.color('#F00');
            axis.tooltip.label.fill = am4core.color('#FFF');
            // axis.tooltip.background.fillOpacity = 0;

            axis.tooltip.background.strokeWidth = 0;
            axis.tooltip.background.cornerRadius = 3;
            axis.tooltip.background.pointerLength = 0;
            axis.tooltip.fontSize = this.axisLabelSizeC;

            axis.tooltip.fontSize = this.sizeC;

            // if (axis instanceof am4charts.DateAxis) {
            //     axis.tooltipDateFormat = 'yyyy-MM-dd';
            // }
            // ## text custom event ##
            // axis.adapter.add("getTooltipText", (text) => {
            //     return ">>> " + text + " <<<";
            // });
        },
    },
};
