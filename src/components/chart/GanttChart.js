const GanttChart = {
    props: {
        'data': Array,  // necessary prop
        'seriesSet': Array,  // necessary prop
        'axisLabelSize': Number,
        'isCategoryAxisDisabled': Boolean,
        'isTodayCurrentRange': Boolean,
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
            throw Error('GanttChart : vue component error : series-set props not found !!');
        }

        this.defaultSlots = this.$slots.default;
        this.makeChart(this.$el);
    },
    data: function() {
        return {
            chart: null,
            seriesColorMap: {},
            dateAxis: null,
        }
    },
    computed: {
        axisLabelSizeC: function() {
            return this.axisLabelSize === undefined ? 20 : this.axisLabelSize;
        }
    },
    methods: {
        makeChart: function(chartDiv){
            const seriesVue = this.defaultSlots.find(s => s.key === 'series');
            if(seriesVue === undefined) {
                console.error('GanttChart : vue component error : series component not found in child component list !!');
                return;
            }

            const createSeries = seriesVue.componentInstance.createSeries;

            am4core.useTheme(am4themes_animated);

            this.chart = am4core.create(chartDiv, am4charts.XYChart);

            const titleVue = this.defaultSlots.find(s => s.key === 'title');
            if(titleVue !== undefined) {
                titleVue.componentInstance.setTitle(this.chart);
            }

            this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            this.chart.paddingRight = 30;
            this.chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";            

            const categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.inversed = true;
            categoryAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;
            categoryAxis.renderer.labels.template.disabled = this.isCategoryAxisDisabled;

            const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.dateFormatter.dateFormat = "HH:mm";
            dateAxis.renderer.minGridDistance = 70;
            dateAxis.baseInterval = { count: 5, timeUnit: "minute" };

            const tooltipVue = this.defaultSlots.find(s => s.key === 'tooltip');
            if(tooltipVue !== undefined) {
                tooltipVue.componentInstance.setTooltip(dateAxis);
                tooltipVue.componentInstance.setTooltip(valueAxis);
            }

            if(this.valueAxisGridValues !== undefined) {
                for(let value of this.valueAxisGridValues) {
                    this.createValueGrid(valueAxis, value);
                }
            }

            let idx = 0;
            for(let series of this.seriesSet) {
                if(series.color !== undefined) {
                    this.seriesColorMap[series.name] = am4core.color(series.color);
                } else {
                    this.seriesColorMap[series.name] = this.chart.colors.getIndex(idx);
                }
                idx++;
            }

            if(this.isTodayCurrentRange) {
                const today = new Date();
                dateAxis.max = today.getTime();

                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                dateAxis.min = today.getTime();
            } else {

            }
            
            dateAxis.strictMinMax = true;
            dateAxis.renderer.tooltipLocation = 0;
            dateAxis.renderer.labels.template.fontSize = this.axisLabelSizeC;

            createSeries(this.chart);

            if(this.isDisplayScrollX) {
                this.chart.scrollbarX = new am4core.Scrollbar();
            } else if(this.isDisplayScollY){
                this.chart.scrollbarY = new am4core.Scrollbar();
            } else if(this.isDisplayScollXY){
                this.chart.scrollbarXY = new am4core.Scrollbar();
            }

            const exportVue = this.defaultSlots.find(s => s.key === 'export');
            if(exportVue !== undefined) {
                exportVue.componentInstance.setExporting(this.chart);
            }

            if(this.data === null) return;

            const data = this.data.map(d => ({
                ...d, color: am4core.color(this.seriesColorMap[d.name])
            }));

            this.chart.data = data;
            const today = new Date();
            dateAxis.max = today.getTime();
            
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