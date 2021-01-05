const WeatherText = {
  template: `
    <div class="weather-text">
      <span>{{temp | tempFilter}}</span> / <span>{{weather}}</span>
    </div>
  `,
  data: function () {
    return {
      temp: '',
      weather: '',
    };
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: async function () {
      const { temp, weather } = await getLatestWeather();
      this.temp = temp;
      this.weather = weather;
    },
  },
  filters: {
    tempFilter: function (temp) {
      return temp + '°C';
    },
  },
};
