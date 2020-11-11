const ChartTitle = {
    props: {
        'text': String, // necessary prop
        'fontSize': Number,
        'margin': Object, 
        'padding': Object,
    },
    template: `
        <div></div>
    `,
    computed: {
        fontSizeC: function() {
            return this.fontSize === undefined ? 10 : this.fontSize;
        },
        marginTop: function() {
            if(this.margin === undefined) return 0;
            return this.margin.top === undefined ? 0 : this.margin.top;
        }, 
        marginLeft: function() {
            if(this.margin === undefined) return 0;
            return this.margin.left === undefined ? 0 : this.margin.left;
        }, 
        marginRight: function() {
            if(this.margin === undefined) return 0;
            return this.margin.right === undefined ? 0 : this.margin.right;
        }, 
        marginBottom: function() {
            if(this.margin === undefined) return 0;
            return this.margin.bottom === undefined ? 0 : this.margin.bottom;
        },
        paddingTop: function() {
            if(this.padding === undefined) return 0;
            return this.padding.top === undefined ? 0 : this.padding.top;
        }, 
        paddingLeft: function() {
            if(this.padding === undefined) return 0;
            return this.padding.left === undefined ? 0 : this.padding.left;
        }, 
        paddingRight: function() {
            if(this.padding === undefined) return 0;
            return this.padding.right === undefined ? 0 : this.padding.right;
        }, 
        paddingBottom: function() {
            if(this.padding === undefined) return 0;
            return this.padding.bottom === undefined ? 0 : this.padding.bottom;
        },
    },
    methods: {
        setTitle: function(chart) {
            if(this.text === undefined) {
                throw Error('ChartTitle : vue component error : text props not found !!');
            }

            const title = chart.titles.create();
            title.text = this.text;
            title.fontSize = this.fontSizeC;

            title.marginTop = this.marginTop;
            title.marginLeft = this.marginLeft;
            title.marginRight = this.marginRight;
            title.marginBottom = this.marginBottom;

            title.paddingTop = this.paddingTop;
            title.paddingLeft = this.paddingLeft;
            title.paddingRight = this.paddingRight;
            title.paddingBottom = this.paddingBottom;
        }
    }




}