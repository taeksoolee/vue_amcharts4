const ControlSubContent = {
  props: [
    'dataList',
    'title',
    'skey',
    'gkey',
    'reqList',
    'isExistAutobtn',
    'isTempControl',
  ],
  template: `
    <div class="my-card card-div">
      <div class="title">
        <i class="fa fa-circle"></i>
        &nbsp;&nbsp;
        {{title}}
        &nbsp;&nbsp;
        <!--
        <span class="text-info font-weight-bold">{{onCnt}}</span>
        /
        <span>{{totalCnt}}</span>
        -->
        <span>{{totalCnt}}</span>  -&gt;  <span class="text-info font-weight-bold">{{onCnt}}</span>
        <div class="btn-container">
          <button class="btn btn-info none-background" @click="controlAllDevice(1)">ON</button>
          <button class="btn btn-info none-background" @click="controlAllDevice(0)">OFF</button>
          <button class="btn btn-info none-background" ><i class="fas fa-cog"></i></button>
        </div>
      </div>
      <div class="group-container">
        <div class="table-container" v-if="typeof dataListW !== 'undefined'">
          <div class="table-head">
            <div class="table-row">
              <div>위치</div>
              <div>제어</div>
              <div v-if="isExistAutobtn">사용자</div>
              <div v-if="isExistAutobtn">자동화</div>
              <div v-if="isTempControl">온도</div>
              <div v-if="isTempControl">외출</div>
              <div>스케줄</div>
            </div>
          </div>
          <div class="table-body" v-for="data in dataListW">
            <div class="table-row">
              <div>{{data.locationnm}}</div>
              <div class="btn-container">
                <button class="btn btn-info toggle-btn" v-bind:disabled="data.onflag === 1" :class="{'disabled-btn': data.userflag || data.autoflag || data.tempoutsideflag}" @click="controlDevice(data.locationcd, data.devicecd, 1)">ON</button>
                <button class="btn btn-info toggle-btn" v-bind:disabled="data.onflag === 0" :class="{'disabled-btn': data.userflag || data.autoflag || data.tempoutsideflag}" @click="controlDevice(data.locationcd, data.devicecd, 0)">OFF</button>
              </div>
              <div v-if="isExistAutobtn">
                <div class="custom-control custom-switch" style="margin: 0px; display:inline-block;">
                  <input type="checkbox" class="custom-control-input" v-bind:id="'user_'+data.locationcd+'_'+data.devicecd" v-model="data.userflag"/> 
                  <label v-bind:for="'user_'+data.locationcd+'_'+data.devicecd" class="custom-control-label" @click="changeUserflag(data)">
                  </label>
                </div>
              </div>
              <div v-if="isExistAutobtn">
                <div class="custom-control custom-switch" style="margin: 0px; display:inline-block;">
                  <input type="checkbox" class="custom-control-input" v-bind:id="'auto_'+data.locationcd+'_'+data.devicecd" v-model="data.autoflag"/> 
                  <label v-bind:for="'auto_'+data.locationcd+'_'+data.devicecd" class="custom-control-label" @click="changeAutoflag(data)">
                  </label>
                </div>
              </div>
              <div v-if="isTempControl">
                <input type="number" v-model="data.settingTemp" v-bind:disabled="data.tempoutsideflag" style="width: 100%; background: transparent; color: white;" />
              </div>
              <div v-if="isTempControl">
                <div class="custom-control custom-switch" style="margin: 0px; display:inline-block;">
                  <input type="checkbox" class="custom-control-input" v-bind:id="'temp_'+data.locationcd+'_'+data.devicecd" v-model="data.tempoutsideflag"/> 
                  <label v-bind:for="'temp_'+data.locationcd+'_'+data.devicecd" class="custom-control-label" @click="changeTempoutsideflag(data)">
                  </label>
                </div>
              </div>
              <div>
                <i class="fas fa-calendar" @click="openModal({locationcd: data.locationcd, devicecd: data.devicecd})"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      updateObj: {
        req: false,
        obj: null,
      },
      dataListW: [],
    };
  },
  created: function () {
    EventBus.$on('update:img-control-data', (data) => {
      const rst = this.dataListW.map((control) => {
        if (
          control.locationcd === data.obj.locationcd &&
          control.devicecd === data.obj.devicecd
        ) {
          return data.obj;
        } else {
          return control;
        }
      });

      this.dataListW = rst;
    });
  },
  computed: {
    totalCnt: function () {
      if (typeof this.dataListW === 'undefined') {
        return 0;
      } else {
        return this.dataListW.length;
      }
    },
    onCnt: function () {
      if (typeof this.dataListW === 'undefined') {
        return 0;
      } else {
        return this.dataListW.filter((d) => d.onflag === 1).length;
      }
    },
  },
  methods: {
    changeTempoutsideflag({ locationcd, devicecd }) {},
    changeAutoflag({ locationcd, devicecd }) {
      const find = this.dataListW.find((data) => {
        return data.locationcd === locationcd && data.devicecd === devicecd;
      });

      find.userflag = false;
    },
    changeUserflag({ locationcd, devicecd }) {
      const find = this.dataListW.find((data) => {
        return data.locationcd === locationcd && data.devicecd === devicecd;
      });

      find.autoflag = false;
    },
    async controlAllDevice(onflag) {
      if (typeof this.dataListW !== 'undefined') {
        for (const data of this.dataListW) {
          const { locationcd, devicecd } = data;

          const sleep = new Promise(function (res, rej) {
            window.setTimeout(function () {
              res(true);
            }, 1000);
          });

          const sleepV = await sleep;
          console.log('sleepValue', sleepV);

          this.controlDevice(locationcd, devicecd, onflag);
        }
      }
    },
    async controlDevice(locationcd, devicecd, onflag) {
      const obj = {
        skey: this.skey,
        gkey: this.gkey,
        locationcd: parseInt(locationcd),
        devicecd: parseInt(devicecd),
        onflag,
      };

      const rst = await setControlOnflag(obj);
      if (rst) {
        this.updateDataList(obj);
        const find = this.dataListW.find((data) => {
          return data.locationcd === locationcd && data.devicecd === devicecd;
        });

        find.userflag = false;
        find.autoflag = false;
        find.changeTempoutsideflag = false;
      }
    },
    updateDataList(obj) {
      if (typeof this.dataListW !== 'undefined') {
        const find = this.dataListW.find(
          (d) =>
            d.skey == obj.skey &&
            d.gkey == obj.gkey &&
            d.locationcd == obj.locationcd &&
            d.devicecd == obj.devicecd,
        );

        find.onflag = obj.onflag;
        EventBus.$emit('update:control-data', { obj: find });
      }
    },
    openModal: function (keys) {
      this.$emit('req:open-modal', { keys: keys });
    },
  },
  watch: {
    dataList: function (list) {
      this.dataListW = JSON.parse(JSON.stringify(list)).map((item) => {
        return {
          ...item,
          autoflag: false,
          userflag: false,
          tempoutsideflag: false,
          settingTemp: 15,
        };
      });
    },
    reqList: function (reqList) {
      const { locationcd, onflag } = reqList[reqList.length - 1];

      if (locationcd === 0) {
        this.dataListW.forEach(({ locationcd, devicecd }) => {
          this.controlDevice(locationcd, devicecd, onflag);
        });
      } else {
        this.dataListW
          .filter((device) => device.locationcd == locationcd)
          .forEach(({ locationcd, devicecd }) => {
            this.controlDevice(locationcd, devicecd, onflag);
          });
      }
    },
  },
};
