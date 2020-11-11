am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.XYChart);

chart.data = generateChartData();

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;

var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 2;

series.tooltipText = "{valueY}";
series.tooltip.pointerOrientation = "vertical";

series.tooltip.label.padding(12,12,12,12)
series.fillOpacity = 1;

let fillModifier = new am4core.LinearGradientModifier();
fillModifier.opacities = [1, 0];
fillModifier.offsets = [0, 1];
fillModifier.gradient.rotation = 90;
series.segments.template.fillModifier = fillModifier;

chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = series;

function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 1000);
    var visits = 1200;
    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        
        visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}