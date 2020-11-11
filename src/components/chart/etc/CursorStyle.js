const CursorStyle = {
    props: {
        'fillOpacity': Number,
        'isFullWidth': Boolean,
        'color': String,
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        fillOpacityC: function() {
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
        colorC: function() {
            return this.color === undefined ? am4core.color('#F00') : am4core.color(this.color);
        }
    },
    methods: {
        setStyle: function(chart) {
            chart.cursor.fullWidthLineX = this.isFullWidth;
            chart.cursor.lineX.stroke = this.colorC;
            chart.cursor.lineX.strokeOpacity = this.fillOpacityC;
            chart.cursor.lineX.strokeWidth = 1;
            chart.cursor.lineX.strokeDasharray = "";
            chart.cursor.lineX.fixedWidthGrid = 1;
        }
    }
}