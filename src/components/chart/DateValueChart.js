const DateValueChart = {
    props: {
        'data': Array,  // necessary prop
        'seriesSet': Array, // necessary prop
        'axisLabelSize': Number, 
        'valueAxisMin': Number, 
        'valueAxisMax': Number, 
        'valueAxisGridValues': Array,
        'isDateAxisDisabled': Boolean,
        'isValueAxisDisabled': Boolean,
        'isLegendDisplay': Boolean,
        'legendSize': Number,
        'isDisplayScrollX': Boolean,
        'isDisplayScrollY': Boolean,
        'isDisplayScrollXY': Boolean,
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    mounted: function(){ 
        if(this.seriesSet === undefined) {
            throw Error('DateValueChart : vue component error : series-set props not found !!');
        }

        this.defaultSlots = this.$slots.default;

        this.makeChart(this.$el);
    },
    data: function() {
        return {
            chart: null
        }
    },
    computed: {
        axisLabelSizeC: function() {
            return this.axisLabelSize === undefined ? 10 : this.axisLabelSize;
        },
        valueAxisMinC: function() {
            return this.valueAxisMin === undefined ? 0 : this.valueAxisMin;
        },
        valueAxisMaxC: function() {
            return this.valueAxisMax === undefined ? 0 : this.valueAxisMax;
        },
        legendSizeC : function() {
            return this.legendSize === undefined ? 5 : this.legendSize;
        }
    },
    methods: {
        makeChart: function(chartDiv){
            const seriesVue = this.defaultSlots.find(s => s.key === 'series');
            if(seriesVue === undefined) {
                console.error('DateValueChart : vue component error : series component not found in child component list !!');
                return;
            }
            const createSeries = seriesVue.componentInstance.createSeries;

            am4core.useTheme(am4themes_animated);

            this.chart = am4core.create(chartDiv, am4charts.XYChart);

            const titleVue = this.defaultSlots.find(s => s.key === 'title');
            if(titleVue !== undefined) {
                titleVue.componentInstance.setTitle(this.chart);
            }

            const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 50;
            dateAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;
            dateAxis.renderer.labels.template.disabled = this.isDateAxisDisabled;

            const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = this.valueAxisMinC;
            valueAxis.max = this.valueAxisMaxC;
            valueAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;
            valueAxis.renderer.labels.template.disabled = this.isValueAxisDisabled;

            const tooltipVue = this.defaultSlots.find(s => s.key === 'tooltip');
            if(tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(dateAxis);
                tooltipVue.componentInstance.setTooltip(valueAxis);
            }

            let idx = 0;
            for(const {name, color} of this.seriesSet) {
                let seriesColor = this.chart.colors.getIndex(idx);
                if(color !== undefined) {
                    seriesColor = am4core.color(seriesColor);
                }

                const series = createSeries(this.chart, name, seriesColor);
                idx++;
            }

            if(this.isLegendDisplay) {
                this.chart.legend = new am4charts.Legend();
                this.chart.legend.fontSize = this.legendSizeC;
            }

            const exportVue = this.defaultSlots.find(s => s.key === 'export');
            if(exportVue !== undefined) {
                exportVue.componentInstance.setExporting(this.chart);
            }


            this.chart.cursor = new am4charts.XYCursor();
            this.chart.cursor.xAxis = dateAxis;

            const styleVues = this.defaultSlots.filter(s => (/^.*style.*$/i.test(s.key)));
            for (let styleVue of styleVues) {
                styleVue.componentInstance.setStyle(this.chart);
            }

            if(this.isDisplayScrollX) {
                this.chart.scrollbarX = new am4core.Scrollbar();
            } else if(this.isDisplayScollY){
                this.chart.scrollbarY = new am4core.Scrollbar();
            } else if(this.isDisplayScollXY){
                this.chart.scrollbarXY = new am4core.Scrollbar();
            }

            this.chart.data = this.data;
        },
        createValueGrid(valueAxis, value) {
            let range = valueAxis.axisRanges.create();
            range.value = value;
            range.label.text = "{value}";
        }
    },
    watch: {
        data: function(data){
            if(this.chart === null) return;
            this.chart.dispose();

            while(!this.chart.isDisposed()) {
                break;
            }

            this.makeChart(this.$el);
        }
    }
}