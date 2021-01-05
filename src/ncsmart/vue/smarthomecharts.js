const vueChartDataTypeForNC = {
  dust2dot5: {
    seriesSet: [
      { name: 'outside_A', color: undefined },
      { name: 'outside_B', color: undefined },
      { name: 'room1_A', color: undefined },
      { name: 'room1_B', color: undefined },
      { name: 'room2_A', color: undefined },
      { name: 'room2_B', color: undefined },
      { name: 'room3_A', color: undefined },
      { name: 'room3_B', color: undefined },
      { name: 'livingroom_A', color: undefined },
      { name: 'livingroom_B', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'outside', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    seriesSetDashboard: [
      { name: 'outside', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    fieldName: 'coldate',
  },
  temp: {
    seriesSet: [
      { name: 'outside_A', color: undefined },
      { name: 'outside_B', color: undefined },
      { name: 'room1_A', color: undefined },
      { name: 'room1_B', color: undefined },
      { name: 'room2_A', color: undefined },
      { name: 'room2_B', color: undefined },
      { name: 'room3_A', color: undefined },
      { name: 'room3_B', color: undefined },
      { name: 'livingroom_A', color: undefined },
      { name: 'livingroom_B', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'outside', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    seriesSetDashboard: [
      { name: 'outside', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    fieldName: 'coldate',
  },
  humi: {
    seriesSet: [
      { name: 'outside_A', color: undefined },
      { name: 'outside_B', color: undefined },
      { name: 'room1_A', color: undefined },
      { name: 'room1_B', color: undefined },
      { name: 'room2_A', color: undefined },
      { name: 'room2_B', color: undefined },
      { name: 'room3_A', color: undefined },
      { name: 'room3_B', color: undefined },
      { name: 'livingroom_A', color: undefined },
      { name: 'livingroom_B', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'outside', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    seriesSetDashboard: [
      { name: 'outside', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    fieldName: 'coldate',
  },
  co2_: {
    seriesSet: [
      { name: 'outside_A', color: undefined },
      { name: 'outside_B', color: undefined },
      { name: 'room1_A', color: undefined },
      { name: 'room1_B', color: undefined },
      { name: 'room2_A', color: undefined },
      { name: 'room2_B', color: undefined },
      { name: 'room3_A', color: undefined },
      { name: 'room3_B', color: undefined },
      { name: 'livingroom_A', color: undefined },
      { name: 'livingroom_B', color: undefined },
      { name: 'outside', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    seriesSetDashboard: [
      { name: 'outside', color: undefined },
      { name: 'room1', color: undefined },
      { name: 'room2', color: undefined },
      { name: 'room3', color: undefined },
      { name: 'livingroom', color: undefined },
    ],
    fieldName: 'coldate',
  },
  tempCompareBar: {
    seriesSet: [
      { name: 'inside', color: 'orange' },
      { name: 'outside', color: 'orange' },
    ],
    fieldName: 'div',
  },
  humiCompareBar: {
    seriesSet: [
      { name: 'inside', color: 'green' },
      { name: 'outside', color: 'green' },
    ],
    fieldName: 'div',
  },
  plugCompareBar: {
    seriesSetDashboard: [
      { name: '플러그1(라즈베리파이)', color: undefined },
      { name: '플러그2', color: undefined },
      { name: '42f520081982', color: undefined },
      { name: '42f52008397d', color: undefined },
    ],
    fieldName: 'coldate',
  },
  faultPie: {
    colorSet: {
      critical: '#e74a3b',
      major: '#fb811c',
      minor: '#f6c23e',
    },
    categoryName: 'div',
    valueName: 'cnt',
  },
  faultBar: {
    seriesSet: [
      {
        name: 'critical',
        color: '#e74a3b',
      },
      {
        name: 'major',
        color: '#fb811c',
      },
      {
        name: 'minor',
        color: '#f6c23e',
      },
    ],
    fieldName: 'div',
  },
  faultBarForLocation: {
    seriesSet: [
      {
        name: 'thr_high',
        color: '#29b6f6',
      },
      {
        name: 'thr_low',
        color: '#26a69a',
      },
      {
        name: 'fault',
        color: '#6200ea',
      },
    ],
    fieldName: 'div',
  },
};

let keyListProm = new Promise((res, rej) => {
  fetch('/dashboard/key/plugin/list.json')
    .then((r) => r.json())
    .then((d) => {
      res(d);
    });
});

(async () => {
  try {
    const keyList = await keyListProm;
    console.log('plug/keyList ::: ', keyList);
    for (const key of keyList) {
      const find = vueChartDataTypeForNC.plugCompareBar.seriesSetDashboard.find(
        (item) => {
          return item.name == key;
        },
      );

      if (find === undefined) {
        vueChartDataTypeForNC.plugCompareBar.seriesSetDashboard.push({
          name: key,
          color: undefined,
        });
      }
    }
  } catch {
    console.error('thorw in smarthomecharts.js');
  }
})();

function getVueChartData(data, fieldName) {
  const resultObj = {
    max: null,
    min: null,
    data: null,
  };

  const keys = Object.keys(data[0]);
  keys.splice(keys.indexOf(fieldName), 1);

  resultObj.data = data.map((d) => {
    for (let key of keys) {
      const value = d[key];
      resultObj.max =
        resultObj.max === null
          ? value
          : resultObj.max < value
          ? value
          : resultObj.max;
      resultObj.min =
        resultObj.min === null
          ? value
          : resultObj.min > value
          ? value
          : resultObj.min;
    }

    return {
      ...d,
      COLDATE: new Date(d.COLDATE),
    };
  });

  return resultObj;
}

const Dust2Dot5Chart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-legend-display="true"
      :is-exporting-display="true"
    />
    `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.dust2dot5.seriesSet,
      fieldName: vueChartDataTypeForNC.dust2dot5.fieldName,
    };
  },
};

const DashboardDust2Dot5Chart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
    />
    `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.dust2dot5.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.dust2dot5.fieldName,
    };
  },
};

const TempChart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-legend-display="true"
      :is-exporting-display="true"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.temp.seriesSet,
      fieldName: vueChartDataTypeForNC.temp.fieldName,
    };
  },
};

const DashboardTempChart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.temp.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.temp.fieldName,
    };
  },
};

const HumiChart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-legend-display="true"
      :is-exporting-display="true"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.humi.seriesSet,
      fieldName: vueChartDataTypeForNC.humi.fieldName,
    };
  },
};

const DashboardHumiChart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.humi.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.humi.fieldName,
    };
  },
};

const Co2Chart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-legend-display="true"
      :is-exporting-display="true"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.co2_.seriesSet,
      fieldName: vueChartDataTypeForNC.co2_.fieldName,
    };
  },
};

const DashboardCo2Chart = {
  props: ['data', 'theme'],
  template: `
    <multi-line-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
    />
  `,
  components: { 'multi-line-chart': MultiLineChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.co2_.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.co2_.fieldName,
    };
  },
};

const DashboardTempCompareBarChart = {
  props: ['data', 'theme'],
  template: `
    <multi-bar-category-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-stack="false"
      :value-axis-max="30"
      :value-axis-min="-30"
    />
  `,
  components: { 'multi-bar-category-chart': MultiBarCategoryChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.tempCompareBar.seriesSet,
      fieldName: vueChartDataTypeForNC.tempCompareBar.fieldName,
    };
  },
};

const DashboardHumiCompareBarChart = {
  props: ['data', 'theme'],
  template: `
    <multi-bar-category-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-stack="false"
      :value-axis-max="100"
      :value-axis-min="0"
    />
  `,
  components: { 'multi-bar-category-chart': MultiBarCategoryChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.humiCompareBar.seriesSet,
      fieldName: vueChartDataTypeForNC.humiCompareBar.fieldName,
    };
  },
};

const DashboardPlugCompareChart = {
  props: ['data', 'theme'],
  template: `
    <multi-bar-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-stack="true"
      :value-axis-max="valueAxisMax"
      :value-axis-min="valueAxisMin"
    />
  `,
  components: { 'multi-bar-chart': MultiBarChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.plugCompareBar.seriesSetDashboard,
      fieldName: vueChartDataTypeForNC.plugCompareBar.fieldName,
      valueAxisMax: 100,
      valueAxisMin: 0,
    };
  },
  watch: {
    data: function () {
      let max = 0;
      this.data.forEach((d) => {
        let tmp = 0;
        for (const key in d) {
          if (key === 'coldate') continue;
          tmp = d[key] > tmp ? d[key] : tmp;
        }
        max = tmp > max ? tmp : max;
      });

      this.valueAxisMax = max + 5;
    },
  },
};

// fault chart
const FaultPieChart = {
  props: ['data', 'title', 'theme'],
  template: `
      <pie-chart-a
          :data="data"
          :title="title"
          :theme="theme"
          :category-name="categoryName"
          :value-name="valueName"
          :color-set="colorSet"
      />
    `,
  data: function () {
    return {
      colorSet: vueChartDataTypeForNC.faultPie.colorSet,
      categoryName: vueChartDataTypeForNC.faultPie.categoryName,
      valueName: vueChartDataTypeForNC.faultPie.valueName,
    };
  },
  components: {
    'pie-chart-a': PieChartA,
  },
};

const FaultBarChart = {
  props: ['data', 'theme'],
  template: `
    <multi-bar-category-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-stack="true"
      :value-axis-max="valueAxisMax"
      :value-axis-min="0"
      :is-legend-display="true"
    />
  `,
  components: { 'multi-bar-category-chart': MultiBarCategoryChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.faultBar.seriesSet,
      fieldName: vueChartDataTypeForNC.faultBar.fieldName,
    };
  },
  computed: {
    valueAxisMax: function () {
      let max = 0;
      const data = this.data;
      for (const i in data) {
        for (const j in data[i]) {
          if (typeof data[i][j] == 'number') {
            max = data[i][j] > max ? data[i][j] : max;
          }
        }
      }

      return max;
    },
  },
};

const FaultBarChartForLocation = {
  props: ['data', 'theme'],
  template: `
    <multi-bar-category-chart
      :data="data"
      :theme="theme"
      :series-set="seriesSet"
      :fieldName="fieldName"
      :is-stack="true"
      :value-axis-max="valueAxisMax"
      :value-axis-min="0"
      :is-legend-display="true"
      :fillOpacity="0.3"
      :is-stroke="true"
    />
  `,
  components: { 'multi-bar-category-chart': MultiBarCategoryChart },
  data: function () {
    return {
      dataC: [],
      seriesSet: vueChartDataTypeForNC.faultBarForLocation.seriesSet,
      fieldName: vueChartDataTypeForNC.faultBarForLocation.fieldName,
    };
  },
  computed: {
    valueAxisMax: function () {
      let max = 0;
      const data = this.data;
      for (const i in data) {
        for (const j in data[i]) {
          if (typeof data[i][j] == 'number') {
            max = data[i][j] > max ? data[i][j] : max;
          }
        }
      }

      return max;
    },
  },
};
