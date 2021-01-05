const LoadingScreen = {
  props: ['isDisplay'],
  template: `
		<div v-show="isDisplay" class="loading">
			<img src="/resources/images/loading.gif" />
		</div>
	`,
};
