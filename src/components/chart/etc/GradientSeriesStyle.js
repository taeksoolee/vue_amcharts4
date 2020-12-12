const GradientSeriesStyle = {
    props: {
        fillOpacity: Number,
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        fillOpacityC: function () {
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
    },
    methods: {
        setStyle: function (series) {
            const fillModifier = new am4core.LinearGradientModifier();
            fillModifier.opacities = [this.fillOpacityC, 0];
            fillModifier.offsets = [0, 0.3, 0.5, 0.8, 1];
            fillModifier.gradient.rotation = 90;
            series.segments.template.fillModifier = fillModifier;
        },
    },
};
