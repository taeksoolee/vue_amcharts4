const SeriesBulletsStyle = {
    props: {
        type: String, // c, r, t
        fillOpacity: Number,
        figureSize: Number,
        fillColor: String,
        strokeColor: String,
        hoverScale: Number,
        displayText: String, // 설정시 이 텍스트가  true로 들어간 데이터만 display
    },
    template: `
        <div>
            <slot></slot>
        </div>
    `,
    computed: {
        typeC: function () {
            const type =
                this.type === undefined ? 'c' : this.type.toLowerCase();

            switch (type) {
                case 'c':
                    return am4core.Circle;
                case 'r':
                    return am4core.Rectangle;
                case 't':
                    return am4core.Triangle;
                default:
                    console.error(
                        'BulletsSeriesStyle : vue component error : unknown type props',
                    );
            }
        },
        figureSizeC: function () {
            return this.figureSize === undefined ? 3 : this.figureSize;
        },
        fillOpacityC: function () {
            return this.fillOpacity === undefined ? 1 : this.fillOpacity;
        },
        fillColorC: function () {
            return this.fillColor === undefined
                ? null
                : am4core.color(this.fillColor);
        },
        strokeColorC: function () {
            return this.strokeColor === undefined
                ? undefined
                : am4core.color(this.strokeColor);
        },
        hoverScaleC: function () {
            return this.hoverScale === undefined ? 1 : this.hoverScale;
        },
    },
    methods: {
        setStyle: function (series) {
            const bullet = series.bullets.push(new am4charts.Bullet());

            if (this.displayText !== undefined) {
                bullet.disabled = true;
                bullet.propertyFields.disabled = this.displayText;
            }

            const figure = bullet.createChild(this.typeC);
            figure.width = this.figureSizeC;
            figure.height = this.figureSizeC;
            figure.horizontalCenter = 'middle';
            figure.verticalCenter = 'middle';

            if (this.fillColorC !== null) {
                figure.fill = this.fillColorC;
            }

            if (!this.strokeColorC) {
                figure.stroke = this.strokeColorC;
            }

            const hoverState = bullet.states.create('hover');
            hoverState.properties.scale = this.hoverScale;

            const defaultSlots =
                this.$slots.default === undefined ? [] : this.$slots.default;

            const styleVues = defaultSlots.filter((s) =>
                /^.*style.*$/i.test(s.key),
            );
            for (let styleVue of styleVues) {
                styleVue.componentInstance.setStyle(bullet);
            }
        },
    },
};
