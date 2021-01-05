// 전체 자동화
const ControlMainContent = {
  props: [],
  template: `
    <div class="group-container">
      <div class="btn-container">
        <button class="btn btn-info main-btn none-background" @click="controlDevice(1, 0)">ON</button>
        <button class="btn btn-info main-btn none-background" @click="controlDevice(0, 0)">OFF</button>
      </div>
    </div>
  `,
  methods: {
    controlDevice(onflag, locationcd) {
      return;
      this.$emit('request:control', {
        // all is 0
        locationcd: locationcd,
        onflag: onflag,
      });
    },
  },
};

// 전체 제어
const ControlMainContent_old = {
  props: [],
  template: `
    <div class="group-container">
      <div class="btn-container">
        <button class="btn btn-info main-btn none-background" @click="controlDevice(1, 0)">ON</button>
        <button class="btn btn-info main-btn none-background" @click="controlDevice(0, 0)">OFF</button>
      </div>
      <div class="label-container">
        <div>실내 거실 & 주방</div>
        <div>방1</div>
        <div>방2</div>
        <div>방3</div>
      </div>
      <div class="btn-container">
        <div class="btn-container">
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(1, 5)">ON</button>
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(0, 5)">OFF</button>
        </div>
        <div class="btn-container">
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(1, 2)">ON</button>
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(0, 2)">OFF</button>
        </div>
        <div class="btn-container">
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(1, 3)">ON</button>
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(0, 3)">OFF</button>
        </div>
        <div class="btn-container">
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(1, 4)">ON</button>
          <button class="btn btn-info sub-btn none-background" @click="controlDevice(0, 4)">OFF</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    controlDevice(onflag, locationcd) {
      this.$emit('request:control', {
        // all is 0
        locationcd: locationcd,
        onflag: onflag,
      });
    },
  },
};
