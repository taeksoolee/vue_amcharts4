const PieSeries = {
    props: {
        'seriesStrokeWidth': Number,
        'fillOpacity': Number 
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        fillOpacityC: function(){
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
    },
    methods: {
        createSeries: function(chart, valueName, categoryName) {
            const series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = valueName;
            series.dataFields.category = categoryName;
            series.slices.template.stroke = am4core.color("#fff");
            series.slices.template.strokeOpacity = 1;
            
            series.hiddenState.properties.opacity = 1;
            series.hiddenState.properties.endAngle = -90;
            series.hiddenState.properties.startAngle = -90;
            series.fillOpacity = this.fillOpacityC;

            const defaultSlots = this.$slots.default === undefined ? [] : this.$slots.default;

            const tooltipVue = defaultSlots.find(s => s.key === 'tooltip');
            if(tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(series, 'color', null, true);
            }

            return series;
        }
    }
}