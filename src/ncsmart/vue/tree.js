const TreeMenu = {
  props: ['isNotDisplay'],
  template: `
    <div id="tree" class="dashboard-tree" style="
      transition: height 0.1s ease 0s;
    " ref="tree">
      <div class="title toggle" @click="toggleTree">트리 메뉴</div>
    </div>
	`,
  mounted: async function () {
    var tree = new Tree(this.$el);
    this.data = await getDeviceStructureMapList();
    const data = this.data;

    let treeOps = [];

    for (let state of data) {
      const stateObj = {
        name: state.statenm,
        type: Tree.FOLDER,
        children: [],
      };

      treeOps.push(stateObj);

      const aptList = data.filter((s) => {
        return s.statenm === state.statenm;
      });

      for (let apt of aptList) {
        const aptObj = {
          name: apt.aptnm,
          type: Tree.FOLDER,
          children: [],
        };

        stateObj.children.push(aptObj);

        for (let structure of apt.structureList) {
          if (structure.sname === null) continue;
          const structureObj = {
            name: structure.sname,
            type: Tree.FOLDER,
            children: [],
          };

          aptObj.children.push(structureObj);

          for (let gateway of structure.gatewayList) {
            if (gateway.gname === null) continue;
            const gatewayObj = {
              name: gateway.gname,
            };
            structureObj.children.push(gatewayObj);
          }
        }
      }
    }

    treeOps[0].open = true;
    treeOps[0].children[0].open = true;
    treeOps[0].children[0].children[0].open = true;
    treeOps[0].children[0].children[0].children[0].selected = true;

    tree.json(treeOps);

    const selectedState = data[0];
    const selectedStructure = data[0].structureList[0];
    const selectedGateway = data[0].structureList[0].gatewayList[0];

    this.$emit('select', {
      keys: {
        statecd: selectedState.statecd,
        skey: selectedStructure.skey,
        gkey: selectedGateway.gkey,
      },
      names: {
        statenm: selectedState.statenm,
        aptnm: selectedState.aptnm,
        sname: selectedStructure.sname,
        gname: selectedGateway.gname,
      },
    });

    const that = this;
    tree.on('select', (e) => {
      const depth4 = e.innerText; // gname
      const depth3 = e.parentElement.children[0].innerText; // sname
      const depth2 = e.parentElement.parentElement.children[0].innerText; // aptnm
      const depth1 =
        e.parentElement.parentElement.parentElement.children[0].innerText; // statenm

      if (depth4[depth4.length - 1] === '호') {
        const selectedState = that.data.find(
          (d) => d.statenm === depth1 && d.aptnm === depth2,
        );
        const selectedStructure = selectedState.structureList.find(
          (d) => d.sname === depth3,
        );
        const selectedGateway = selectedStructure.gatewayList.find(
          (d) => d.gname === depth4,
        );

        that.$emit('select', {
          keys: {
            statecd: selectedState.statecd,
            skey: selectedStructure.skey,
            gkey: selectedGateway.gkey,
          },
          names: {
            statenm: depth1,
            aptnm: depth2,
            sname: depth3,
            gname: depth4,
          },
        });
      }
    });

    if (this.isNotDisplay) {
      this.toggleTree();
    }
  },
  data: function () {
    return {
      isOn: true,
      tmpStyle: {},
    };
  },
  methods: {
    toggleTree: function () {
      this.isOn = !this.isOn;

      if (this.isOn) {
        this.$el.querySelector(
          'details',
        ).style.display = this.tmpStyle.detailsDisplay;
        this.$el.style.height = this.tmpStyle.height;
        this.$el.style.paddingBottom = this.tmpStyle.paddingBottom;
        this.$el.style.paddingTop = this.tmpStyle.paddingTop;
      } else {
        this.tmpStyle.detailsDisplay = this.$el.querySelector(
          'details',
        ).style.display;
        this.tmpStyle.height = this.$el.style.height;
        this.tmpStyle.paddingBottom = this.$el.style.paddingBottom;
        this.tmpStyle.paddingTop = this.$el.style.paddingTop;

        this.$el.querySelector('details').style.display = 'none';
        this.$el.style.height = 0;
        this.$el.style.paddingBottom = 0;
        this.$el.style.paddingTop = '1.8rem';
      }
    },
  },
};
