const LineSeries = {
    props: {
        'fieldName': String,  // necessary prop
        'seriesStrokeWidth': Number, 
        'fillOpacity': Number,
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        seriesStrokeWidthC: function() {
            return this.seriesStrokeWidth === undefined ? 10 : this.seriesStrokeWidth;
        },
        fillOpacityC: function(){
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
    },
    methods: {
        createSeries: function(chart, seriesName, seriesColor) {
            if(this.fieldName === undefined) {
                throw Error('LineSeries : vue component error : field-name props not found !!')
            }

            const series = chart.series.push(new am4charts.LineSeries());
            
            series.dataFields.valueY = seriesName;
            series.dataFields.dateX = this.fieldName;
            series.strokeWidth = this.seriesStrokeWidthC;
            series.fillOpacity = this.fillOpacityC;

            series.fill = seriesColor;
            series.stroke = seriesColor;

            const defaultSlots = this.$slots.default === undefined ? [] : this.$slots.default;
            
            const styleVues = defaultSlots.filter(s => (/^.*style.*$/i.test(s.key)));
            for (let styleVue of styleVues) {
                styleVue.componentInstance.setStyle(series);
            }

            const tooltipVue = defaultSlots.find(s => s.key === 'tooltip');
            if(tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(series, seriesColor, seriesName + " : {valueY}");
            }

            const legendVue = defaultSlots.find(s => s.key === 'legend');
            if(legendVue !== undefined) {
                legendVue.componentInstance.setLegend(series, seriesName);
            }

            return series;
        }
    }
}