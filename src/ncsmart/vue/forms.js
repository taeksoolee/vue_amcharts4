const StructureMapSelectForm = {
  props: ['stateList', 'structureList', 'gatewayList'],
  template: `
		<div class="col pb-3">
			<select class="form-control state-select">
				<option v-for="state in stateList" :value="state.statecd">{{state.aptnm}}</option>
			</select>
      <select class="form-control structure-select">
        <option v-for="structure in structureList" :value="structure.skey">{{structure.sname}}</option>
      </select>
      <select class="form-control gateway-select">
        <option v-for="gateway in gatewayList" :value="gateway.gkey">{{gateway.gname}}</option>
      </select>
    </div>
	`,
};
