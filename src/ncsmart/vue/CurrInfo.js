const CurrInfo = {
  props: ['selectedKey'],
  template: `
    <div class="curr-info">
      <select @change="selectCurrData"
          style="
            background: rgba(0, 0, 0, 0.4);
            color: white;
            outline: none;
            border: 1px solid transparent;
            width: 6rem;
            text-align-last: center;
            padding: .3rem;
            margin: 0.3rem;
          "
        >
          <option  value="temp" selected>temp</option>
          <option value="humi">humi</option>
          <option value="dust_pm25">dust</option>
          <option value="co2">co2</option>
        </select>
      <div class="curr-info-row">
        <div class="curr-info-category">항목</div> 
        <div class="curr-info-category">거실 & 주방</div>
        <div class="curr-info-category">ROOM 1</div>
        <div class="curr-info-category">ROOM 2</div>
        <div class="curr-info-category">ROOM 3</div>
        <div class="curr-info-category">실 외</div>
      </div>
      <div class="curr-info-row">
        <div class="curr-info-category">통합센서 A</div>
        <div class="curr-info-category">{{curr.livingroom_A || '' | round}}</div>
        <div class="curr-info-category">{{curr.room1_A || '' | round}}</div>
        <div class="curr-info-category">{{curr.room2_A || '' | round}}</div>
        <div class="curr-info-category">{{curr.room3_A || '' | round}}</div>
        <div class="curr-info-category">{{curr.outside_A || '' | round}}</div>
      </div>
      <div class="curr-info-row">
        <div class="curr-info-category">통합센서 B</div>      		
        <div class="curr-info-category">{{curr.livingroom_B || '' | round}}</div>
        <div class="curr-info-category">{{curr.room1_B || '' | round}}</div>
        <div class="curr-info-category">{{curr.room2_B || '' | round}}</div>
        <div class="curr-info-category">{{curr.room3_B || '' | round}}</div>
        <div class="curr-info-category">{{curr.outside_B || '' | round}}</div>
      </div>
    </div>
  `,
  data: function () {
    return {
      curr: {},
    };
  },
  mounted: function () {
    this.selectCurrData();
  },
  methods: {
    selectCurrData: async function (e) {
      const { skey, gkey } = this.selectedKey;

      if (skey === undefined || gkey === undefined) {
        console.error('skey gkey iligel');
        return;
      }

      const obj = {
        skey: skey,
        gkey: gkey,
        sensor: typeof e === 'undefined' ? 'temp' : e.target.value,
      };

      // recent
      const currData = await getRecentPerformanceData(obj);

      if (currData.result && currData.docs.length > 0) {
        this.curr = currData.docs[currData.docs.length - 1];
      }
    },
  },
  watch: {
    selectedKey: function (keys) {
      this.selectCurrData();
    },
  },
  filters: {
    round: function (v) {
      if (typeof v === 'string') return '';
      return v.toFixed(2);
    },
  },
};
