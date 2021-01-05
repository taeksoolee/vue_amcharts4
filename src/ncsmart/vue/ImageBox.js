const ImageBoxBtns = {
  props: [
    'mode',
    'handleRegister',
    'handleModify',
    'handleRemove',
    'clearMode',
    'isDownmode',
  ],
  template: `
    <div>
      <div
        v-if="!isDownmode"
        v-show="mode !== 0" 
        style="
          border: 1px solid rgba(255,255,255,.3);
          padding: .5rem;
          background: rgba(50,50,50,.7);
        "
      >
        <span class="text-info">{{mode | modeText}}</span>
        <span @click="clearMode"
          style="
            float: right;
            cursor: pointer;
            width: 1.5rem;
          "
        >x</span>
      </div>
      <div>
        <button class="btn btn-info" @click="register" :disabled="mode === 1">등록</button>
        <button class="btn btn-info" @click="modify" :disabled="mode === 2 || mode === 2.5">수정</button>
        <button class="btn btn-info" @click="remove" :disabled="mode === 3">삭제</button>
      </div>
      <div
        v-if="isDownmode"
        v-show="mode !== 0" 
        style="
          border: 1px solid rgba(255,255,255,.3);
          padding: .5rem;
          background: rgba(50,50,50,.7);
        "
      >
        <span class="text-info">{{mode | modeText}}</span>
        <span @click="clearMode"
          style="
            float: right;
            cursor: pointer;
            width: 1.5rem;
          "
        >x</span>
      </div>
    </div>
  `,
  methods: {
    register: function () {
      this.handleRegister();
    },
    modify: function () {
      this.handleModify();
    },
    remove: function () {
      this.handleRemove();
    },
  },
  filters: {
    modeText: function (v) {
      switch (v) {
        case 1:
          return '등록 모드';
        case 2:
          return '수정 모드';
        case 2.1:
          return '수정(선택) 모드';
        case 3:
          return '삭제 모드';
        default:
          return '';
      }
    },
  },
};

const SensorImageBox = {
  props: ['imageSrc', 'sensorList', 'skey', 'gkey', 'isResisterMode'],
  template: `
    <div style="display: flex; justify-content: center; height: 100%">
      <div style="width: 100%; text-align:center; ">
        <div draggable="false" 
          v-bind:style="imgStyle"
        >
          <div class="grid-box">
            <div v-for="(item, idx) in grid" v-bind:id="'grid_' + idx" 
              v-bind:class="{'select-grid': isResisterMode && selectedGridIdx===idx}"
              @click="selectGrid(idx)"
              @mouseover="mouseoverGrid(idx)"
            >
              <div v-if="item !== null" style="position:relative; width: 100%; height: 100%;">
                <div
                class="sensor-icon" 
                  style="text-align: left;"
                  v-bind:class="{[item.sensorClass]: true, 'sensor-icon-hover': mode===2 || mode===3, 'selected-sensor-icon': selectedModifyItem == item}" 
                  @mouseover.self="mouseoverSensorIcon(item)"
                  @click.self.stop="clickSensorIcon(item)"
                ></div>
                <div class="sensor-filter-container" 
                  v-if="mode===0"
                >
                  <div class="sensor-icon-filter" v-bind:class="[item.filterClass]"></div>
                  <div class="sensor-detail-box" v-if="typeof item.data !== 'undefined'">
                    <div>{{item.locationnm}}</div>
                    <div v-if="item.data.temp !== undefined">temp : {{item.data.temp | round}}</div>
                    <div v-if="item.data.humi !== undefined">humi : {{item.data.humi | round}}</div>
                    <div v-if="item.data.dust_pm25 !== undefined">dust : {{item.data.dust_pm25 | round}}</div>
                    <div v-if="item.data.co2 !== undefined">co2 : {{item.data.co2 | round}}</div>
                    <div v-if="item.data.cnt !== undefined">cnt : {{item.data.cnt}}</div>
                  </div>
                </div>
                <!--{{item.locationnm}}/{{item.sensornm}}/{{item.fltflag}}-->
              </div>
            </div>
          </div>
        </div>
        <image-box-btns 
          style="position:absolute; right:1rem; bottom:1rem;"
          :mode="mode"
          :handle-register="handleRegister"
          :handle-modify="handleModify"
          :handle-remove="handleRemove"
          :clear-mode="resetMode"
        />
      </div>
    </div>
  `,
  components: {
    'image-box-btns': ImageBoxBtns,
  },
  data: function () {
    return {
      imgStyle: {},
      idxList: [],
      grid: [],
      sensorData: {
        temp: '',
        humi: '',
        dust_pm25: '',
        co2: '',
      },
      selectedGridIdx: null,
      mode: 0, // 0: none, 1: register, 2:modify, 3: remove,
      selectedModifyItem: null,
    };
  },
  methods: {
    resetMode: function () {
      this.mode = 0;
    },
    clickSensorIcon: async function (item) {
      if (this.mode === 2) {
        // 수정 모드
        this.mode = 2.1;
        this.selectedModifyItem = item;
      } else if (this.mode === 3) {
        // 삭제 모드
        const { skey, gkey, locationcd, sensorcd } = item;

        const rst = await setDevice2d({ skey, gkey, locationcd, sensorcd });

        EventBus.$emit('complete:sensor-icon-save', rst);
      }
    },
    handleRegister: function () {
      this.mode = 1;
    },
    handleModify: function () {
      this.mode = 2;
    },
    handleRemove: function () {
      this.mode = 3;
    },
    mouseoverGrid: function (idx) {
      if (this.mode === 1) {
        this.selectedGridIdx = idx;
      } else if (this.mode === 2.1) {
        this.selectedGridIdx = idx;
      }
    },
    selectGrid: async function (item) {
      if (this.mode === 1) {
        EventBus.$emit('req:register-modal', item);
      } else if (this.mode === 2.1) {
        const { skey, gkey, locationcd, sensorcd } = this.selectedModifyItem;
        const p = item;

        const rst = await setDevice2d({ skey, gkey, locationcd, sensorcd, p });

        this.selectedModifyItem = null;
        EventBus.$emit('complete:sensor-icon-save', rst);
      }
    },
    getSensorData: function (item) {
      const locations = [];
      switch (item.locationcd) {
        case 1:
          locations.push('outside');
          break;
        case 2:
          locations.push('room1');
          break;
        case 3:
          locations.push('room2');
          break;
        case 4:
          locations.push('room3');
          break;
        case 5:
          locations.push('livingroom');
          break;
      }

      const sensorList = ['temp', 'humi', 'dust_pm25', 'co2'];

      const tmpObj = {
        skey: this.skey,
        gkey: this.gkey,
        locations,
      };

      let sensorType = 'A';
      if (/.*A.*/.test(item.sensornm)) {
        sensorType = 'A';
      } else if (/.*B.*/.test(item.sensornm)) {
        sensorType = 'B';
      }

      const promList = [];
      for (const sensor of sensorList) {
        tmpObj.sensor = sensor;
        const rst = getRecentPerformanceData(tmpObj, sensorType);
      }

      // if (rst.result) {
      //   rstObj[sensor] = rst.docs[0][locations[0]];
      // }

      return rstObj;
    },
  },
  watch: {
    mode: function (m) {
      if (m !== 1) {
        this.selectedGridIdx = null;
      }
    },
    sensorList: async function (list) {
      const tmpSensorList = [];
      for (const sensor of list) {
        const { skey, gkey, locationcd } = sensor;

        let data = await getRecentIntegratedData({ skey, gkey, locationcd });
        if (data.result) {
          switch (sensor.sensornm) {
            case '통합센서A':
              sensor.data = data.docs[0].integrated_A;
              break;
            case '통합센서B':
              sensor.data = data.docs[0].integrated_B;
              break;
          }
        }

        let cntData = await getTodayHumanCount();
        if (cntData.result) {
          if (sensor.sensornm == '인체감지센서') {
            sensor.data = cntData.docs[0];
          }
        }

        let sensorClass = '';
        switch (sensor.sensornm) {
          case '통합센서A':
            sensorClass = 'integrated-sensor-a';
            break;
          case '통합센서B':
            sensorClass = 'integrated-sensor-b';
            break;
          case '인체감지센서':
            if (parseInt(sensor.data.cnt) % 2 === 1) {
              sensorClass = 'detacting-sensor-on';
            } else {
              sensorClass = 'detacting-sensor-off';
            }
            break;
        }

        let filterClass = '';
        switch (sensor.fltflag) {
          case 1:
            filterClass = 'minor';
            break;
          case 2:
            filterClass = 'major';
            break;
          case 3:
            filterClass = 'critical';
            break;
        }

        tmpSensorList.push({
          ...sensor,
          sensorClass,
          filterClass,
        });
      }

      const grid = [];
      for (let i = 0; i < 900; i++) {
        const find = tmpSensorList.find((v) => parseInt(v['2d']) === i);
        if (typeof find !== 'undefined') {
          grid.push(find);
        } else {
          grid.push(null);
        }
      }

      this.grid = grid;
    },
  },
  mounted: function () {
    this.imgStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + this.imageSrc + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    };

    EventBus.$on('complete:sensor-icon-save', () => {
      this.mode = 0;
    });
  },
  filters: {
    round: function (v) {
      return parseFloat(v).toFixed(2);
    },
  },
};

const ControlImageBox = {
  props: ['imageSrc', 'controlList', 'skey', 'gkey', 'isResisterMode'],
  template: `
    <div style="display: flex; justify-content: center; height: 100%">
      <div style="width: 100%; text-align:center; ">
        <div draggable="false" 
          v-bind:style="imgStyle"
        >
          <div class="grid-box">
            <div v-for="(item, idx) in grid" 
              v-bind:id="'grid_' + idx"
              v-bind:class="{'select-grid': isResisterMode && selectedGridIdx===idx}"
              @click="selectGrid(idx)"
              @mouseover="mouseoverGrid(idx)"
            >
              <div v-if="item !== null && typeof item.icon !== 'undefined'" style="position:relative; width: 100%; height: 100%;">
                <div 
                  v-show="item.onflag == 1" 
                  class="control-icon" 
                  style="text-align: left; cursor: pointer;" 
                  v-bind:style="{'background-image': 'url(' + item.icon.on + ')'}"
                  @click.self.stop="clickControlIcon(item, 0)"
                ></div>
                <div 
                  v-show="item.onflag == 0" 
                  class="control-icon" 
                  style="text-align: left; cursor: pointer;" 
                  v-bind:style="{'background-image': 'url(' + item.icon.off + ')'}"
                  @click.self.stop="clickControlIcon(item, 1)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <image-box-btns 
          style="display: inline-block"
          :mode="mode"
          :is-downmode="true"
          :handle-register="handleRegister"
          :handle-modify="handleModify"
          :handle-remove="handleRemove"
          :clear-mode="resetMode"
        />
      </div>
    </div>
  `,
  data: function () {
    return {
      imgStyle: {},
      idxList: [],
      grid: [],
      controlListW: [],
      mode: 0,
      selectedGridIdx: null,
    };
  },
  components: {
    'image-box-btns': ImageBoxBtns,
  },
  methods: {
    resetMode: function () {
      this.mode = 0;
    },
    handleRegister: function () {
      this.mode = 1;
    },
    handleModify: function () {
      this.mode = 2;
    },
    handleRemove: function () {
      this.mode = 3;
    },
    mouseoverGrid: function (idx) {
      if (this.mode === 1) {
        this.selectedGridIdx = idx;
      } else if (this.mode === 2.1) {
        this.selectedGridIdx = idx;
      }
    },
    selectGrid: async function (item) {
      if (this.mode === 1) {
        EventBus.$emit('req:register-modal', item);
      } else if (this.mode === 2.1) {
        const { skey, gkey, locationcd, devicecd } = this.selectedModifyItem;
        const p = item;

        const rst = await setControlDevice2d({
          skey,
          gkey,
          locationcd,
          devicecd,
          p,
        });

        this.selectedModifyItem = null;
        EventBus.$emit('complete:control-icon-save', rst);
      }
    },
    clickControlIcon: async function (item, onflag) {
      if (this.mode === 0) {
        const { locationcd, devicecd } = item;
        this.controlDevice({ locationcd, devicecd }, onflag);
      } else if (this.mode === 2) {
        // 수정 모드
        this.mode = 2.1;
        this.selectedModifyItem = item;
      } else if (this.mode === 3) {
        // 삭제 모드
        const { skey, gkey, locationcd, devicecd } = item;

        const rst = await setControlDevice2d({
          skey,
          gkey,
          locationcd,
          devicecd,
        });

        EventBus.$emit('complete:control-icon-save', rst);
      }
    },
    controlDevice: async function ({ locationcd, devicecd }, onflag) {
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
      }
    },
    updateDataList(obj) {
      const find = this.controlListW.find(
        (d) =>
          d.skey == obj.skey &&
          d.gkey == obj.gkey &&
          d.locationcd == obj.locationcd &&
          d.devicecd == obj.devicecd,
      );

      find.onflag = obj.onflag;
      EventBus.$emit('update:img-control-data', { obj: find });
    },
    getControlData: function (item) {
      const locations = [];
      return rstObj;
    },
    setIconObj: function (list) {
      return list.map((control) => {
        const icon = {
          on: '/resources/models/',
          off: '/resources/models/',
        };
        switch (control.devicecd) {
          case '1':
            icon.on += 'control-ventilation-on.png';
            icon.off += 'control-ventilation-off.png';
            break;
          case '4':
            icon.on += 'control-curtain-on.png';
            icon.off += 'control-curtain-off.png';
            break;
          case '3':
            icon.on += 'control-heater-on.png';
            icon.off += 'control-heater-off.png';
            break;
          case '5':
            icon.on += 'control-switch-on.png';
            icon.off += 'control-switch-off.png';
            break;
          case '6':
            icon.on += 'control-plug-on.png';
            icon.off += 'control-plug-off.png';
            break;
          case '2':
            icon.on += 'control-light-on.png';
            icon.off += 'control-light-off.png';
            break;
        }

        return {
          ...control,
          icon,
        };
      });
    },
  },
  created: function () {
    EventBus.$on('update:control-data', (data) => {
      const rst = this.controlListW.map((control) => {
        if (
          control.locationcd === data.obj.locationcd &&
          control.devicecd === data.obj.devicecd
        ) {
          return data.obj;
        } else {
          return control;
        }
      });

      this.controlListW = this.setIconObj(rst);
    });
  },
  mounted: function () {
    this.imgStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + this.imageSrc + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    };

    EventBus.$on('complete:control-icon-save', () => {
      this.mode = 0;
    });
  },
  watch: {
    mode: function (m) {
      if (m !== 1) {
        this.selectedGridIdx = null;
      }
    },
    controlList: function (list) {
      this.controlListW = this.setIconObj(JSON.parse(JSON.stringify(list)));
    },
    controlListW: function (list) {
      const grid = [];
      for (let i = 0; i < 900; i++) {
        const find = list.find((v) => parseInt(v['d2']) == i);

        if (typeof find !== 'undefined') {
          grid.push(find);
        } else {
          grid.push(null);
        }
      }

      this.grid = grid;
    },
  },
};
