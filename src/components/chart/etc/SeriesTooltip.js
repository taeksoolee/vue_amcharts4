const SeriesTooltip = {
    props: {
        size: Number,
        tooltipStyle: String,
        fillOpacity: Number,
    },
    template: `<div></div>`,
    computed: {
        sizeC: function () {
            return this.size === undefined ? 10 : this.size;
        },
        styleC: function () {
            return this.tooltipStyle === undefined
                ? 'a'
                : this.tooltipStyle.toLocaleLowerCase();
        },
        fillOpacityC: function () {
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
    },
    methods: {
        setTooltip(series, seriesColor, tooltipText, isPropertyFields) {
            series.tooltip.zIndex = 9999;

            series.tooltip.fontSize = this.sizeC;
            // series.tooltip.pointerOrientation = "vertical";

            series.tooltip.getFillFromObject = false;
            series.tooltip.fillOpacity = this.fillOpacityC;

            switch (this.styleC) {
                case 'a':
                    this.styleA(
                        series,
                        seriesColor,
                        tooltipText,
                        isPropertyFields,
                    );
                    break;
                case 'b':
                    this.styleB(
                        series,
                        seriesColor,
                        tooltipText,
                        isPropertyFields,
                    );
                    break;
            }
            series.tooltip.background.fillOpacity = 1;
        },
        styleA: function (series, seriesColor, tooltipText, isPropertyFields) {
            // background: white
            if (isPropertyFields) {
                series.tooltip.label.propertyFields.fill = seriesColor;
                series.tooltip.background.propertyFields.stroke = seriesColor;

                if (series instanceof am4charts.ColumnSeries) {
                    series.columns.template.tooltipText = tooltipText;
                }
            } else {
                series.tooltip.label.fill = seriesColor;
                series.tooltip.background.stroke = seriesColor;
                series.tooltipText = tooltipText;
            }
        },
        styleB: function (series, seriesColor, tooltipText, isPropertyFields) {
            // color: white
            if (isPropertyFields) {
                series.tooltip.label.propertyFields.fill = am4core.color(
                    '#fff',
                );
                series.tooltip.background.propertyFields.fill = seriesColor;
                series.tooltip.background.propertyFields.stroke = am4core.color(
                    '#fff',
                );

                if (series instanceof am4charts.ColumnSeries) {
                    series.columns.template.tooltipText = tooltipText;
                }
            } else {
                series.tooltip.label.fill = am4core.color('#fff');
                series.tooltip.background.fill = seriesColor;
                series.tooltip.background.stroke = am4core.color('#fff');
                series.tooltipText = tooltipText;
            }
        },
    },
};
