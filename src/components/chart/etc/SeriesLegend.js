const SeriesLegend = {
    props: {
        'isValue': Number
    },
    template: `<div></div>`,
    computed: {
        
    },
    methods: {
        setLegend(series, seriesName, hoverSeriesName) {
            hoverSeriesName = hoverSeriesName === undefined ? seriesName:hoverSeriesName;
            
            if(this.isValue){
                series.legendSettings.labelText = seriesName + " : ";
                series.legendSettings.itemLabelText = hoverSeriesName + " : ";

                series.legendSettings.valueText = "{valueY.close}";
                series.legendSettings.itemValueText = "{valueY}";
            } else {
                series.legendSettings.labelText = seriesName;
                series.legendSettings.itemLabelText = hoverSeriesName;
            }

        }
    }
}


