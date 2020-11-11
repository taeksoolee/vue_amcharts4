const Pattern = {
    props: {
        'size': Number,
        'color': String,
        'lighten': Number,
        'strokeWidth': Number,
        'rotationDegree': Number,
    },
    template: `
        <div></div>
    `,
    data: function() {
        return { pattern: null }
    },
    computed: {
        sizeC: function() {
            return this.size === undefined ? 5 : this.size;
        },
        strokeC: function() {
            let color = null;
            color = this.color === undefined ? am4core.color('#000') : am4core.color(this.color);
            color = this.lighten === undefined ? color : color.lighten(this.lighten);

            return color;
        },
        strokeWidthC: function() {
            return this.strokeWidth === undefined ? 2 : this.strokeWidth;
        },
        rotationC: function() {
            return this.rotationDegree === undefined ? 45 : this.rotationDegree;
        }
    },
    mounted: function() {
        this.pattern = new am4core.LinePattern();
        pattern.width = this.sizeC;
        pattern.height = this.sizeC;
        pattern.stroke = this.strokeC;
        pattern.strokeWidth = this.strokeWidth;
        pattern.rotation = this.rotationDegree;
    }
}