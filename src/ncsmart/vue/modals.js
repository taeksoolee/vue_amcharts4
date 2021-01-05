const SelectDay = {
  props: ['clearCount', 'specificKey'],
  template: `
    <div class="col-12 day-select-container" style="display: flex;">
      <div style="display: flex;">
        <label 
          v-for="(day, idx) in dayList" 
          v-bind:for="'select_day_'+specificKey+idx" 
          class="btn btn-info day-btn"
          v-bind:class="{'active': selectedDayList.includes(day.value)}"
        >
          {{day.name}}
          <input 
            type="checkbox" 
            v-bind:id="'select_day_'+specificKey+idx" 
            :value="day.value" 
            v-model="selectedDayList"
            style="display: none;"
          />
        </label>
      </div>
      <div style="display: flex; margin-left: 0.5rem;">
        <label 
          v-bind:for="'select_day_'+specificKey+'every'" 
          class="btn btn-info day-batch-btn"
          v-bind:class="{'active': selectedAllDay}"
        >
          매일&nbsp;
          <input type="checkbox" v-bind:id="'select_day_'+specificKey+'every'" v-model="selectedAllDay" style="display: none;">
        </label>
        <label 
          v-bind:for="'select_day_'+specificKey+'week'" 
          class="btn btn-info day-batch-btn"
          v-bind:class="{'active': selectedWeekDay}"
        >
          주말&nbsp;
          <input type="checkbox" v-bind:id="'select_day_'+specificKey+'week'" v-model="selectedWeekDay" style="display: none;">
        </label>
      </div>
    </div>
	`,
  data: function () {
    return {
      dayList: [
        { name: '월', value: '1' },
        { name: '화', value: '2' },
        { name: '수', value: '3' },
        { name: '목', value: '4' },
        { name: '금', value: '5' },
        { name: '토', value: '6' },
        { name: '일', value: '7' },
      ],
      selectedDayList: [],
      selectedWeekDay: false,
      selectedAllDay: false,
      flag: false,
    };
  },
  watch: {
    clearCount: function () {
      this.selectedWeekDay = false;
      this.selectedAllDay = false;
      this.selectedDayList = [];
    },
    selectedDayList: function (n) {
      const list = JSON.parse(JSON.stringify(n));
      list.sort();

      if (list.length === 7) {
        this.selectedAllDay = true;
      } else if (list.length === 2 && list[0] == 6 && list[1] == 7) {
        this.selectedWeekDay = true;
      } else {
        if (this.selectedWeekDay === true) {
          this.flag = true;
        }
        this.selectedAllDay = false;
        this.selectedWeekDay = false;
      }

      this.$emit('get:list', this.selectedDayList);
    },
    selectedWeekDay: function (n) {
      if (this.flag) {
        this.flag = false;
        return;
      } else if (this.selectedAllDay) {
        return;
      }
      if (n === true) {
        this.selectedDayList = ['6', '7'];
      } else if (
        this.selectedDayList[0] == '6' &&
        this.selectedDayList[1] == '7'
      ) {
        this.selectedDayList = [];
      } else if (this.selectedDayList[0] == '6') {
        this.selectedDayList = ['7'];
        this.flag = false;
      } else if (this.selectedDayList[0] == '7') {
        this.selectedDayList = ['6'];
        this.flag = false;
      }
    },
    selectedAllDay: function (n) {
      if (n === true) {
        this.selectedDayList = ['1', '2', '3', '4', '5', '6', '7'];
        this.selectddWeekDay = true;
      } else {
        this.selectedDayList = [];
      }
    },
  },
};

const ModalHeader = {
  template: `
    <div class="modal-header">
      <div class="modal-title"><slot></slot></div>
      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  `,
};

const ModalTitle = {
  props: ['description'],
  template: `
    <div class="small mb-2">
      <div class="text-white">
        <i class="fas fa-info-circle pr-2"></i>
        <slot></slot>
        <span class="text-warning px-3">
          {{description}}
        </span>
      </div>
    </div>
  `,
};

const ModalLabel = {
  template: `
    <label class="small text-info">
      <i class="fas fa-angle-right pr-1"></i>
      <span class="">
        <slot></slot>
      </span>
    </label>
  `,
};

const ColGroup = {
  props: ['colWidthList'],
  template: `
      <col v-for="w in colWidthList" v-bind:width="w + '%'"/>
  `,
  mounted: function () {
    // console.log('colWidthList', this.colWidthList);
  },
};

const AddSensorModal = {
  props: ['sensorList', 'selectedKeys', 'selectedPosition', 'boxType'],
  components: {
    'modal-header': ModalHeader,
    'modal-title': ModalTitle,
    'modal-label': ModalLabel,
  },
  template: `
		<div class="modal fade" id="addSensorModal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
        <div class="modal-content">
          <modal-header>센서 위치 등록</modal-header>
            <div class="modal-body" id="thrBody">
                <modal-title>센서 등록</modal-title>
                <div class="row mb-3 px-3" >
                    <div class="col-xl-12">
                        <modal-label>센서 선택</modal-label>
                        <div class="row">
                            <div class="col pb-3">
                                <select class="form-control form-control-lg">
                                  <option 
                                    v-for="sensor in sensorPositionNullList" 
                                    :value="joinString(sensor.locationcd, sensor.sensorcd)" 
                                  >
                                    {{sensor.locationnm +' | '+ sensor.sensornm}}
                                  </option>
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-outline-info mx-auto float-right" type="button" style="height: 2rem; line-height: 1;" @click="add">
                          저장
                        </button>
                    </div>
                    <div class="col-xl-12 border-bottom border-dark pb-3 mx-auto text-right">
                    </div>
                </div>
            </div>
        </div>
			</div>
		</div>
	`,
  methods: {
    add: async function () {
      const values = this.splitString(this.$el.querySelector('select').value);

      const param = {
        skey: this.selectedKeys.skey,
        gkey: this.selectedKeys.gkey,
        statecd: this.selectedKeys.statedcd,
        locationcd: values.locationcd,
        sensorcd: values.sensorcd,
        p: this.selectedPosition,
      };

      let resultRow = 0;
      switch (this.boxType) {
        case '2d':
          resultRow = await setDevice2d(param);
          break;
        case '3d':
          resultRow = await setDevice3d(param);
          break;
      }
      if (resultRow > 0) {
        const sensorList = this.sensorList.map((s) => {
          if (
            s.sensorcd == parseInt(param.sensorcd) &&
            s.locationcd == parseInt(param.locationcd) &&
            s.gkey == param.gkey &&
            s.skey == param.skey
          ) {
            const result = s;
            result[this.boxType] = param.p;
            return result;
          }

          return s;
        });

        this.$emit('update', sensorList);
      }
      $(this.$el).modal('hide');
    },
    splitString: function (str) {
      const split = str.split('_');
      return {
        locationcd: split[0],
        sensorcd: split[1],
      };
    },
    joinString: function (...str) {
      let result = '';
      for (let i in str) {
        result += str[i];
        result += i != str.length - 1 ? '_' : '';
      }
      return result;
    },
  },
  computed: {
    sensorPositionNullList: function () {
      return this.sensorList.filter((s) => s[this.boxType] === null);
    },
  },
  watch: {},
};

const SensorInfoModal = {
  props: ['selectedSensor', 'performanceData', 'sensorList', 'boxType'],
  components: {
    'modal-header': ModalHeader,
    'modal-title': ModalTitle,
    'modal-label': ModalLabel,
  },
  template: `
		<div class="modal fade" id="sensorInfoModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <modal-header>센서 상세 정보</modal-header>
              <div class="modal-body" id="thrBody">
                <modal-title>센서 설치 위치</modal-title>
                  <div class="row mb-3 px-3">
                      <div class="col-xl-12 border-bottom border-dark pb-3">
                          <div class="row">
                              <div class="col-xl-4">
                                <modal-label>농가</modal-label>
                                  <div id="sApt">서울 푸르지오</div>
                              </div>
                              <div class="col-xl-4">
                                  <modal-label>동</modal-label>
                                  <div id="sDong">101동</div>
                              </div>
                              <div class="col-xl-4">
                                  <modal-label>호</modal-label>
                                  <div id="sHo">101호</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <modal-title>실시간 데이터</modal-title>
                  <div class="row mb-3 px-3 settingThrTemplate" >
                      <div class="col-xl-12">
                        <div v-for="(data, k) in performanceData">
                          <modal-label>{{k | mapWord}}</modal-label>
                          <div class="row">
                              <div class="col pb-3">
                                  <input class=" form-control thrLow" type="text" v-bind:value="data" disabled style="text-align: right;">
                              </div>
                          </div>
                          </div>
                      </div>
                      <div class="col-xl-12 border-bottom border-dark pb-3 mx-auto text-right"></div>
                  </div>
                  <button class="btn btn-info" style="float: right;" @click="remove">위치 삭제</button>
              </div>
          </div>
      </div>
		</div>
	`,
  methods: {
    remove: async function () {
      const param = {
        skey: this.selectedSensor.skey,
        gkey: this.selectedSensor.gkey,
        statecd: this.selectedSensor.statedcd,
        locationcd: this.selectedSensor.locationcd,
        sensorcd: this.selectedSensor.sensorcd,
        p: null,
      };

      let resultRow = null;
      switch (this.boxType) {
        case '2d':
          resultRow = await setDevice2d(param);
          break;
        case '3d':
          resultRow = await setDevice3d(param);
          break;
      }

      if (resultRow > 0) {
        const that = this;
        const sensorList = this.sensorList.map((s) => {
          if (
            s.sensorcd == parseInt(param.sensorcd) &&
            s.locationcd == parseInt(param.locationcd) &&
            s.gkey == param.gkey &&
            s.skey == param.skey
          ) {
            const result = s;
            result[that.boxType] = param.p;
            return result;
          }

          return s;
        });
        this.$emit('update', sensorList);
      }
      $(this.$el).modal('hide');
    },
  },
  filters: {
    mapWord: function (item) {
      const map = {};

      return item;
    },
  },
};

const CardHeader = {
  props: ['chartTitle', 'iconClass'],
  template: `
    <div class="card-header">
      <h6 class="m-0">
        <i v-bind:class="icon"></i>
        {{chartTitle}}
        <slot></slot>
      </h6>
    </div>
  `,
  computed: {
    icon: function () {
      return this.iconClass || ['fa', 'fa-circle'];
    },
  },
};

const CardChart = {
  props: ['durationIndex', 'chartTitle', 'iconClass', 'isMultiChart'],
  components: {
    'card-header': CardHeader,
  },
  template: `
		<div class="card h-100 animated--fade-in-left chart-card" v-bind:class="durationClass">
      <card-header :chartTitle="chartTitle" :icon-class="iconClass">
        <slot name="buttons"></slot>
      </card-header>
      <div class="card-body card-body-chart" v-bind:class="{'d-flex': isMultiChart, 'justify-content-around': isMultiChart}" style="padding: .5rem;">
        <slot></slot>
      </div>
    </div>
  `,
  computed: {
    durationClass: function () {
      const result = {};

      result['animated--duration--' + this.durationIndex] = true;
      return result;
    },
  },
};

const RegisterSchedule = {
  props: ['requestClearCount', 'addBtnText'],
  template: `
    <div class="small mb-2">
      <modal-title description="장비의 스케줄을 등록합니다.">스케줄 등록</modal-title>
      <div class="col-xl-12">
        <modal-label>ON</modal-label>
        <div class="row" >
          <div class="col pb-3">
            <select-day 
              @get:list="setStartDayList" 
              :clear-count="clearCount"
              specific-key="on"
            ></select-day>
            <input class="form-control start-date" type="text" />
          </div>
        </div>
        <modal-label>OFF</modal-label>
        <div class="row" >
          <div class="col pb-3">
            <select-day 
              @get:list="setEndDayList" 
              :clear-count="clearCount"
              specific-key="off"
            ></select-day>
            <input class="form-control end-date" type="text" />
          </div>
        </div>
        <div class="row" >
          <button class="btn btn-outline-info mx-auto" type="button" style="height: 2rem; line-height: 1;" @click="save">
            {{addBtnText || '+'}}
          </button>
        </div>
      </div>
    </div>
	`,
  components: {
    'select-day': SelectDay,
    'modal-header': ModalHeader,
    'modal-title': ModalTitle,
    'modal-label': ModalLabel,
  },
  data: function () {
    return {
      startDayList: [],
      endDayList: [],
      selectedControl: {},
      clearCount: 0,
    };
  },
  mounted: function () {
    $(this.$el.querySelector('.start-date')).datetimepicker({
      format: 'HH:mm',
    });
    $(this.$el.querySelector('.end-date')).datetimepicker({
      format: 'HH:mm',
    });
  },
  methods: {
    setStartDayList: function (d) {
      this.startDayList = d;
    },
    setEndDayList: function (d) {
      this.endDayList = d;
    },
    save: async function (e) {
      const startTime = this.$el.querySelector('.start-date').value;
      const endTime = this.$el.querySelector('.end-date').value;
      const startDays = this.startDayList.join(',');
      const endDays = this.endDayList.join(',');

      if (
        startTime == '' ||
        endTime == '' ||
        startDays == '' ||
        endDays == ''
      ) {
        alert('모든 항목을 선택해주세요.');
        return;
      }

      const obj = {
        startcron: this.getCron(startTime, startDays),
        endcron: this.getCron(endTime, endDays),
      };

      this.$emit('req:save', obj);
    },
    getCron: function (time, days) {
      const hour = parseInt(time.split(':')[0]);
      const minute = parseInt(time.split(':')[1]);
      return '0 ' + minute + ' ' + hour + ' * * ' + days;
    },
  },
  watch: {
    requestClearCount: function (n) {
      // select day 초기화
      this.clearCount += 1;

      // iuput 초기화
      this.$el.querySelector('.start-date').value = '';
      this.$el.querySelector('.end-date').value = '';
    },
  },
  filters: {
    getDeviceName: function (c) {
      return c.locationnm + ' | ' + c.devicenm;
    },
  },
};

const ScehduleList = {
  props: ['cronList'],
  template: `
		<div class="small mb-2">
      <modal-title description="스케줄을 확인합니다.">스케줄 목록</modal-title>
      <div class="col-xl-12 schedulelist-container">
        <div v-for="(cron, idx) in cronList" style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <div style="">
              {{cron.startcron | convertCronText}}
            </div>
            <div style="">
              {{cron.endcron | convertCronText}}
            </div>
          </div>
          <div>
            <div class="custom-control custom-switch" style="margin: 0;">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                v-bind:id="'cron_'+idx" 
                v-model="cron.manflag == 1"
                @change="toggleCronManflag(idx)" 
              >
              <label 
                class="custom-control-label" 
                v-bind:for="'cron_'+idx"
              ></label>
            </div>
            <div class="custom-control" style="margin: 0; padding: 0;">
              <button class="btn btn-info" style="font-size: 10px;" @click="deleteCron(idx)">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
	`,
  components: {
    'modal-title': ModalTitle,
    'modal-label': ModalLabel,
  },
  data: function () {
    return {
      expectDeleteSeqList: [],
    };
  },
  methods: {
    toggleCronManflag: function (idx) {
      const cronList = this.cronList;

      if (cronList[idx].manflag == '0') {
        cronList[idx].manflag = '1';
      } else {
        cronList[idx].manflag = '0';
      }

      // this.$emit(
      //   'req:change-cron-list',
      //   cronList.map(({ seq, startcron, endcron, manflag }) => {
      //     return { seq, startcron, endcron, manflag };
      //   }),
      // );

      const modifyManflagObj = {
        seq: cronList[idx].seq,
        manflag: cronList[idx].manflag,
      };

      this.$emit('req:update-modify-manflag', modifyManflagObj);
    },
    deleteCron: function (idx) {
      const expectDeleteSeqList = this.expectDeleteSeqList;
      const cronList = this.cronList.filter((c, i) => {
        const rst = i !== idx;
        if (!rst) {
          if (typeof c.seq !== 'undefined') {
            console.log('delete-seq', c.seq);
            expectDeleteSeqList.push(c.seq);
          }
        }
        return rst;
      });

      this.$emit('req:change-cron-list', cronList);
      this.$emit('req:change-expect-delete-seq-list', expectDeleteSeqList);
    },
  },
  filters: {
    convertCronText(c) {
      const cronSplit = c.split(' ');
      const hour =
        parseInt(cronSplit[2]) > 10 ? cronSplit[2] : '0' + cronSplit[2];
      const minute =
        parseInt(cronSplit[1]) > 10 ? cronSplit[1] : '0' + cronSplit[1];
      const daySplit = cronSplit[5].split(',');
      const dayList = [];
      const dayMap = ['', '월', '화', '수', '목', '금', '토', '일'];
      const everyDayList = ['월', '화', '수', '목', '금', '토', '일'];

      for (let i in daySplit) {
        dayList.push(dayMap[daySplit[i]]);
      }

      let days = dayList.join(',');
      if (JSON.stringify(dayList) == JSON.stringify(everyDayList)) {
        days = '매일';
      } else if (JSON.stringify(dayList) == JSON.stringify(['토', '일'])) {
        days = '주말';
      } else {
        days = dayList
          .sort((a, b) => {
            return everyDayList.indexOf(a) - everyDayList.indexOf(b);
          })
          .join(',');
      }

      return '[' + days + '] ' + hour + '시 ' + minute + '분';
    },
    isManflag: function (manflag) {
      return manflag === '1';
    },
  },
};

const CloseBtn = {
  template: `
		<div style="width: 100%; text-align: center;">
      <button class="btn btn-info" @click="close">저장</button>
    </div>
	`,
  methods: {
    close: function () {
      this.$emit('close', true);
    },
  },
};

const ScheduleModal = {
  props: ['closeCount', 'openCount', 'controlInfo'],
  template: `
		<div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">   
        <div class="modal-content">
          <modal-header>
            제어 스케줄 관리
          </modal-header>
          <div class="modal-body">
            <register-schedule 
              :cron-list="cronList" 
              :request-clear-count="clearCount"
              @req:save="addCron"
            ></register-schedule>
            <hr style="border-top: 1px solid rgba(255, 255, 255, .3);" />
            <schedule-list
              v-bind:cron-list="cronList"
              @req:change-cron-list="updateCronList"
              @req:change-expect-delete-seq-list="updateExpectDeletSeqList"
              @req:update-modify-manflag="updateModifyManflagObj"
            ></schedule-list>
            <hr style="border-top: 1px solid rgba(255, 255, 255, .3);" />
            <close-btn @close="saveCronList"></close-btn>
          </div>
        </div>
      </div>
		</div>
  `,
  components: {
    'modal-header': ModalHeader,
    'register-schedule': RegisterSchedule,
    'schedule-list': ScehduleList,
    'close-btn': CloseBtn,
  },
  data: function () {
    return {
      cronList: [],
      expectDeleteSeqList: [],
      modifyManflagObj: {},
      clearCount: 0,
    };
  },
  mounted: function () {
    $(this.$el).on('hidden.bs.modal', () => {
      this.clearCount += 1;
    });
  },
  methods: {
    addCron: function (cron) {
      cron.manflag = '1';
      this.cronList.push(cron);
      // console.log(cron); // startcron, endcron
    },
    updateCronList: function (cronList) {
      this.cronList = cronList;
    },
    updateExpectDeletSeqList: function (expectDeleteSeqList) {
      this.expectDeleteSeqList = expectDeleteSeqList;
    },
    updateModifyManflagObj: function (modifyManflagObj) {
      this.modifyManflagObj[modifyManflagObj.seq] = modifyManflagObj.manflag;
    },
    saveCronList: async function () {
      return;
      const { skey, gkey, locationcd, devicecd } = this.controlInfo;
      const cronList = this.cronList;

      for (const cron of cronList) {
        const { seq, startcron, endcron, manflag } = cron;
        if (typeof seq === 'undefined') {
          await addCron({
            skey,
            gkey,
            locationcd: parseInt(locationcd),
            devicecd: parseInt(devicecd),
            startcron,
            endcron,
            manflag,
          });
        } else {
          // manflag 바꾸는 것 필요
          // console.log('modify', {
          //   seq,
          //   startcron,
          //   endcron,
          //   skey,
          //   gkey,
          // });
        }
      }

      const deleteCronList = this.expectDeleteSeqList.map((seq) => {
        return {
          seq,
          skey,
          gkey,
        };
      });

      for (const cron of deleteCronList) {
        await removeCron(cron);
      }

      const modifyManflagList = [];
      for (const seq in this.modifyManflagObj) {
        modifyManflagList.push({
          seq,
          manflag: this.modifyManflagObj[seq],
        });
      }

      for (const obj of modifyManflagList) {
        await setControlCronManflag(obj);
      }

      this.$emit('req:complete-save', true);
    },
  },
  watch: {
    openCount: function (n) {
      $(this.$el).modal();
    },
    closeCount: function (n) {
      $(this.$el).modal('hide');
    },
    controlInfo: function (info) {
      this.cronList = JSON.parse(JSON.stringify(info.cronList));
    },
  },
};

const RegisterBatchScheduleModal = {
  props: ['openCount'],
  template: `
	  <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">   
        <div class="modal-content">
          <modal-header>
            일괄 스케줄 등록
          </modal-header>
          <div class="modal-body">
            <modal-label>장소 선택</modal-label>
            <div class="row" >
                <structure-map-select-form
                    v-bind:state-list="stateList"
                    v-bind:structure-list="structureList"
                    v-bind:gateway-list="gatewayList"
                ></structure-map-select-form>
            </div>
            <modal-label>스케줄 입력</modal-label>
            <register-schedule 
              :request-clear-count="clearCount"
              add-btn-text="저장"
              @req:save="saveCron"
            ></register-schedule>
          </div>
        </div>
      </div>
		</div>
	`,
  components: {
    'modal-header': ModalHeader,
    'modal-label': ModalLabel,
    'register-schedule': RegisterSchedule,
    'structure-map-select-form': StructureMapSelectForm,
    'close-btn': CloseBtn,
  },
  data: function () {
    return {
      stateList: [],
      structureList: [],
      gatewayList: [],
      clearCount: 0,
    };
  },
  watch: {
    openCount: async function (c) {
      this.map = await getDeviceStructureMapList();
      this.stateList = this.map;
      this.structureList = this.map[0].structureList;
      this.gatewayList = this.structureList[0].gatewayList;

      this.$el.querySelector('.state-select').value = this.stateList[0].statecd;
      this.$el.querySelector(
        '.structure-select',
      ).value = this.structureList[0].skey;
      this.$el.querySelector(
        '.gateway-select',
      ).value = this.gatewayList[0].gkey;

      $(this.$el).modal();
    },
  },
  mounted: function () {
    $(this.$el.querySelector('.start-date')).datetimepicker({
      format: 'HH:mm',
    });
    $(this.$el.querySelector('.end-date')).datetimepicker({
      format: 'HH:mm',
    });
  },
  methods: {
    setStartDayList: function (d) {
      this.startDayList = d;
    },
    setEndDayList: function (d) {
      this.endDayList = d;
    },
    saveCron: async function (obj) {
      const confirm = window.confirm('스케줄을 일괄 등록 하시겠습니까?');

      if (!confirm) return;

      const skey = this.$el.querySelector('.structure-select').value;
      const gkey = this.$el.querySelector('.gateway-select').value;
      obj.skey = skey;
      obj.gkey = gkey;

      const controlList = await getControlList(skey, gkey);

      let rstCnt = 0;

      for (const control of controlList) {
        const { devicecd, locationcd } = control;
        obj.devicecd = parseInt(devicecd);
        obj.locationcd = parseInt(locationcd);
        const rst = await addCron(obj);
        if (rst) {
          rstCnt += 1;
        }
      }

      this.$emit('req:complete-save', rstCnt);
      this.clearCount += 1;
    },
  },
  filters: {
    getDeviceName: function (c) {
      return c.locationnm + ' | ' + c.devicenm;
    },
  },
};

const SaveBatchThreshold = {
  props: ['threshold', 'clearCount'],
  template: `
		<div class="row">
      <div class="col pb-3">
        <input class=" form-control thrLow" type="text">
      </div>
      <span class="col-auto">~</span>
      <div class="col pb-3">
        <input class=" form-control thrHigh" type="text">
      </div>
      <button class="btn btn-outline-info mx-auto" type="button" style="height: 2rem; line-height: 1;" @click="save">
        저장
      </button>
    </div>
	`,
  watch: {
    clearCount: function (c) {
      this.$el.querySelector('.thrLow').value = '';
      this.$el.querySelector('.thrHigh').value = '';
    },
  },
  methods: {
    save: function () {
      this.$emit('save', {
        division: this.threshold,
        low: this.$el.querySelector('.thrLow').value,
        high: this.$el.querySelector('.thrHigh').value,
      });
    },
  },
};

const SearchModalTitle = {
  template: `
    <div class="text-info mb-1">
      <i class="fas fa-angle-right text-info pr-2"></i><slot></slot>
    </div>
  `,
};

const SearchModalMultipleSelect = {
  props: ['initList'],
  template: `
    <div class="w-100 d-flex align-items-center mb-3">
      <select class="form-control" size="4" multiple="multiple" v-model="selectedDataList">
        <option v-for="data in dataList" @dblclick="moveRight" v-bind:value="data">{{data | mapping}}</option>
      </select>
      <div class="px-1 text-center">
          <a href="#" class="btn btn-info btn-sm mb-1"
            @click="moveLeftAll"
          >
            <i class="fas fa-angle-double-left"></i>
          </a>
          <a href="#" class="btn btn-info btn-sm mb-1"
            @click="moveLeft"
          >
            <i class="fas fa-angle-left"></i>
          </a>
          <a href="#" class="btn btn-info btn-sm mb-1"
            @click="moveRight"
          >
            <i class="fas fa-angle-right"></i>
          </a>
          <a href="#" class="btn btn-info btn-sm"
            @click="moveRightAll"
          >
            <i class="fas fa-angle-double-right"></i>
          </a>
      </div>
      <select class="form-control" size="4" multiple="multiple" v-model="selectedRstList">
        <option v-for="rst in rstList" @dblclick="moveLeft" v-bind:value="rst">{{rst | mapping}}</option>
      </select>
    </div>
  `,
  mounted: function () {
    $(this.$el)
      .find('select')
      .each((i, s) => {
        $(s).multiselect();
      });

    this.dataList = JSON.parse(JSON.stringify(this.initList));
  },
  data: function () {
    return {
      dataList: [],
      rstList: [],
      selectedDataList: [],
      selectedRstList: [],
    };
  },
  watch: {
    initList: function (list) {
      this.dataList = JSON.parse(JSON.stringify(list));
      this.rstList = [];
      this.selectedDataList = [];
      this.selectedRstList = [];
    },
  },
  methods: {
    moveLeftAll: function () {
      this.dataList = [...this.rstList, ...this.dataList];
      this.rstList = [];
      this.sendData();
    },
    moveLeft: function () {
      this.dataList = [...this.dataList, ...this.selectedRstList];
      this.rstList = this.rstList.filter((rst) => {
        return !this.selectedRstList.includes('' + rst);
      });

      this.selectedRstList = [];
      this.sendData();
    },
    moveRight: function () {
      this.rstList = [...this.rstList, ...this.selectedDataList];
      this.dataList = this.dataList.filter((data) => {
        return !this.selectedDataList.includes('' + data);
      });

      this.selectedDataList = [];
      this.sendData();
    },
    moveRightAll: function () {
      this.rstList = [...this.rstList, ...this.dataList];
      this.dataList = [];
      this.sendData();
    },
    sendData: function () {
      this.$emit('send:list', this.rstList);
    },
  },
  filters: {
    mapping: function (v) {
      switch (v) {
        case 'room1':
          return '방1';
        case 'room2':
          return '방2';
        case 'room3':
          return '방3';
        case 'outside':
          return '외기';
        case 'livingroom':
          return '거실';
      }
    },
  },
};

const SearchModalCheckBox = {
  props: ['formId', 'isDefault'],
  template: `
    <div class="form-check form-checkbox-container">
      <input class="form-check-input" type="checkbox" v-bind:id="'checkbox_'+formId" @click="handleClick" :checked="isDefault"/>
      <label class="form-check-label" v-bind:for="'checkbox_'+formId">
        <slot></slot>
      </label>
    </div>
  `,
  methods: {
    handleClick: function (e) {
      const value = e.target.checked;
      this.$emit('send:data', value);
    },
  },
};

const SearchModalRadio = {
  props: ['formId', 'isDefault', 'formName'],
  template: `
    <div class="form-check form-radio-container">
      <input type="radio" class="form-check-input" v-bind:name="formName" v-bind:id="'radio_'+formId" :checked="isDefault" @click="handleClick">
      <label class="form-check-label" v-bind:for="'radio_'+formId">
        <slot></slot>
      </label>
    </div>
  `,
  methods: {
    handleClick: function (e) {
      const value = e.target.id.split('_')[1];
      this.$emit('send:data', value);
    },
  },
};

const SerachModalDatepickerInput = {
  props: ['option'],
  template: `
    <div class="input-group datepicker-group">
      <input class="form-control" type="text" />
      <div class="input-group-append">
          <span class="input-group-text">
            <i class="fas fa-calendar"></i>
          </span>
      </div>
    </div>
  `,
  mounted: function () {
    const $input = $(this.$el).find('input');
    $input.datetimepicker(this.option);
    $input.on('dp.change', (e) => {
      const selectedDate = new Date(e.date._d);

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const date = selectedDate.getDate();
      const dateString = `${year}-${month > 10 ? month : '0' + month}-${
        date > 10 ? date : '0' + date
      }`;
      this.$emit('send:date', dateString);
    });
  },
};

const SearchModal = {
  props: ['openCount', 'closeCount'],
  template: `
  <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
            <div class="modal-content">
              <modal-header>검색</modal-header>
              <div class="modal-body">
                  <div class="search-wrap w-100 flex-column align-items-baseline">
                      <search-modal-title>검색기간</search-modal-title>
                      <div class="date-wrap px-0 mb-3 w-100">
                          <search-modal-datetimpicker-input
                            :option="startdateOption"
                            @send:date="setStartdate"
                          >
                          </search-modal-datetimpicker-input>
                          <span>/</span>
                          <search-modal-datetimpicker-input
                            :option="enddateOption"
                            @send:date="setEnddate"
                          >
                          </search-modal-datetimpicker-input>
                      </div>
                      <search-modal-title>항목 선택</search-modal-title>
                      <div class="w-100 d-flex align-items-center mb-3">
                          <search-modal-multi-select
                            :init-list="['room1', 'room2', 'room3', 'outside', 'livingroom']"
                            @send:list="setLocations"
                          ></search-modal-multi-select>
                      </div>
                      <search-modal-title>센서 선택</search-modal-title>
                      <div class="d-flex mb-3">
                          <serach-modal-checkbox
                            form-id="integratedA"
                            @send:data="setSensorA"
                          >통합센서A</serach-modal-checkbox>
                          <serach-modal-checkbox
                            form-id="integratedB"
                            :is-default="true"
                            @send:data="setSensorB"
                          >통합센서B</serach-modal-checkbox>
                      </div>
                      <search-modal-title>주기 선택</search-modal-title>
                      <div class="d-flex mb-3">
                        <search-modal-radio
                          form-id="minute"
                          form-name="terms"
                          @send:data="setTerm"
                        >1분</search-modal-radio>
                        <search-modal-radio
                          form-id="hour"
                          form-name="terms"
                          :is-default="true"
                          @send:data="setTerm"
                        >1시간</search-modal-radio>
                        <search-modal-radio
                          form-id="day"
                          form-name="terms"
                          @send:data="setTerm"
                        >1일</search-modal-radio>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <input class="ml-auto btn btn-info" type="button" @click="search" value="조회"/>
              </div>
          </div>
      </div>
    </div>
  `,
  components: {
    'modal-header': ModalHeader,
    'search-modal-title': SearchModalTitle,
    'search-modal-datetimpicker-input': SerachModalDatepickerInput,
    'search-modal-multi-select': SearchModalMultipleSelect,
    'serach-modal-checkbox': SearchModalCheckBox,
    'search-modal-radio': SearchModalRadio,
  },
  data: function () {
    return {
      startdateOption: {
        defaultDate: moment().add(-7, 'day'),
        format: 'YYYY-MM-DD',
        // sideBySide: true,
      },
      enddateOption: {
        defaultDate: moment().add(0, 'day'),
        format: 'YYYY-MM-DD',
        // sideBySide: true,
      },
      rstObj: {
        startdate: moment().add(-7, 'day').format('YYYYMMDD000000'),
        enddate: moment().add(0, 'day').format('YYYYMMDD000000'),
        locations: [],
        sensorList: ['B'],
        term: 'hour',
      },
    };
  },
  mounted: function () {},
  methods: {
    setLocations: function (list) {
      this.rstObj.locations = list;
    },
    setStartdate: function (datestr) {
      datestr = datestr.replaceAll('-', '');
      this.rstObj.startdate = datestr + '000000';
    },
    setEnddate: function (datestr) {
      datestr = datestr.replaceAll('-', '');
      this.rstObj.enddate = datestr + '000000';
    },
    setTerm: function (str) {
      this.rstObj.term = str;
    },
    setSensorA: function (v) {
      const sensorList = this.rstObj.sensorList;

      if (v && !sensorList.includes('A')) {
        sensorList.push('A');
      } else if (!v && sensorList.includes('A')) {
        const idx = sensorList.indexOf('A');
        sensorList.splice(idx, 1);
      }
    },
    setSensorB: function (v) {
      const sensorList = this.rstObj.sensorList;

      if (v && !sensorList.includes('B')) {
        sensorList.push('B');
      } else if (!v && sensorList.includes('B')) {
        const idx = sensorList.indexOf('B');
        sensorList.splice(idx, 1);
      }
    },
    search: function () {
      if (
        this.rstObj.locations.length === 0 ||
        this.rstObj.sensorList.length === 0
      ) {
        this.$emit('req:search', false);
      } else {
        this.$emit('req:search', this.rstObj);
      }
    },
  },
  watch: {
    openCount: function () {
      $(this.$el).modal();
    },
    closeCount: function () {
      $(this.$el).modal('hide');
    },
  },
};

const RegisterSensorIconModal = {
  props: ['sensorList'],
  template: `
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <modal-header>센서아이콘 위치등록</modal-header>
            <div class="modal-body">
                <modal-title>센서 선택</modal-title>
                <div class="search-wrap w-100 flex-column align-items-baseline">
                  <select class="form-control form-control-lg" v-model="selected">
                    <option  v-bind:value="null">센서를 선택해주세요.</option>
                    <option v-for="sensor in sensorListC"
                      v-bind:value="sensor.skey+'_'+sensor.gkey+'_'+sensor.locationcd+'_'+sensor.sensorcd"
                    >{{sensor.locationnm}} / {{sensor.sensornm}}</option>
                  </select>
                </div>
            </div>
            <div class="modal-footer">
                <input class="ml-auto btn btn-info" type="button" value="등록" @click="handleClick"/>
            </div>
          </div>
      </div>
    </div>
  `,
  components: {
    'modal-header': ModalHeader,
    'modal-title': ModalTitle,
  },
  mounted: function () {
    EventBus.$on('req:register-modal', (idx) => {
      this.selectedGrid = idx;
      $(this.$el).modal();
    });
  },
  data: function () {
    return {
      selected: null,
      selectedGrid: -1,
    };
  },
  computed: {
    sensorListC: {
      get: function () {
        return this.sensorList.filter((sensor) => {
          return sensor['2d'] === null;
        });
      },
    },
  },
  watch: {
    sensorListC: {
      handler: function () {
        this.selected = null;
        this.selectedGrid = -1;
      },
      deep: true,
    },
  },
  methods: {
    handleClick: async function () {
      const [skey, gkey, locationcd, sensorcd] = this.selected.split('_');

      const obj = {
        skey,
        gkey,
        locationcd,
        sensorcd,
        p: this.selectedGrid,
      };

      const rst = await setDevice2d(obj);
      $(this.$el).modal('hide');

      EventBus.$emit('complete:sensor-icon-save', rst);
    },
  },
};

const RegisterControlIconModal = {
  props: ['controlList'],
  template: `
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <modal-header>제어장비 아이콘 위치등록</modal-header>
            <div class="modal-body">
                <modal-title>제어장비 선택</modal-title>
                <div class="search-wrap w-100 flex-column align-items-baseline">
                  <select class="form-control form-control-lg" v-model="selected">
                    <option  v-bind:value="null">장비를 선택해주세요.</option>
                    <option v-for="control in controlListC"
                      v-bind:value="control.skey+'_'+control.gkey+'_'+control.locationcd+'_'+control.devicecd"
                    >{{control.locationnm}} / {{control.devicenm}}</option>
                  </select>
                </div>
            </div>
            <div class="modal-footer">
                <input class="ml-auto btn btn-info" type="button" value="등록" @click="handleClick"/>
            </div>
          </div>
      </div>
    </div>
  `,
  components: {
    'modal-header': ModalHeader,
    'modal-title': ModalTitle,
  },
  mounted: function () {
    EventBus.$on('req:register-modal', (idx) => {
      this.selectedGrid = idx;
      $(this.$el).modal();
    });
  },
  data: function () {
    return {
      selected: null,
      selectedGrid: -1,
    };
  },
  computed: {
    controlListC: {
      get: function () {
        return this.controlList.filter((control) => {
          return control['d2'] === null;
        });
      },
    },
  },
  watch: {
    controlListC: {
      handler: function () {
        this.selected = null;
        this.selectedGrid = -1;
      },
      deep: true,
    },
  },
  methods: {
    handleClick: async function () {
      const [skey, gkey, locationcd, devicecd] = this.selected.split('_');

      const obj = {
        skey,
        gkey,
        locationcd,
        devicecd,
        p: this.selectedGrid,
      };

      const rst = await setControlDevice2d(obj);
      $(this.$el).modal('hide');

      EventBus.$emit('complete:control-icon-save', rst);
    },
  },
};
