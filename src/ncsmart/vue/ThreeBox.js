/* 3D 함수 */
// var container,
//   camera,
//   scene,
//   light,
//   grid,
//   renderer,
//   labelRenderer,
//   controls,
//   mouse,
//   raycaster,
//   object;

// const loader = new THREE.FBXLoader();

// function makeHelper(target) {
//   const axesHelper = new THREE.AxesHelper(50);
//   target.add(axesHelper);
// }

// function getPointset(e, container) {
//   var gapX = e.clientX - e.offsetX;
//   var gapY = e.clientY - e.offsetY;

//   mouse.x = ((e.clientX - gapX) / container.offsetWidth) * 2 - 1;
//   mouse.y = -((e.clientY - gapY) / container.offsetHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children, true);

//   if (intersects.length > 0) {
//     return {
//       x: intersects[0].point.x,
//       y: intersects[0].point.y,
//       z: intersects[0].point.z,
//     };
//   } else {
//     return null;
//   }
// }

// function createLabel(that, r, cb) {
//   if (scene === undefined) return;

//   const s = r['3d'].split('_');

//   const p = {
//     x: s[0],
//     y: s[1],
//     z: s[2],
//   };

//   const template = that.$el
//     .querySelector('.sensor-3d-icon-template')
//     .cloneNode(true);
//   template.style.display = 'block';
//   template.classList.add(that.getFaultlevelClass(r.fltflag));

//   template.onclick = cb;

//   const label = new THREE.CSS2DObject(template);
//   label.position.set(p.x, p.y, p.z);
//   makeHelper(label);

//   scene.add(label);

//   that.labelList.push(label);
// }

// function initThree(el, callback, param) {
//   container = el;
//   camera = new THREE.PerspectiveCamera(
//     45,
//     container.offsetWidth / container.offsetHeight,
//     1,
//     50000,
//   );

//   scene = new THREE.Scene();

//   makeHelper(scene);

//   light = new THREE.HemisphereLight(0xffffff, 0x444444);
//   light.position.set(0, 200, 0);
//   scene.add(light);

//   light = new THREE.DirectionalLight(0xffffff);
//   light.position.set(0, 200, 100);
//   light.castShadow = true;
//   light.shadow.camera.top = 180;
//   light.shadow.camera.bottom = -100;
//   light.shadow.camera.left = -120;
//   light.shadow.camera.right = 120;
//   scene.add(light);

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(container.offsetWidth, container.offsetHeight);
//   container.appendChild(renderer.domElement);

//   labelRenderer = new THREE.CSS2DRenderer();
//   labelRenderer.setSize(container.offsetWidth, container.offsetHeight);
//   labelRenderer.domElement.style.position = 'absolute';
//   labelRenderer.domElement.style.top = '0px';
//   container.appendChild(labelRenderer.domElement);

//   controls = new THREE.OrbitControls(camera, labelRenderer.domElement);
//   controls.target.set(0, 100, 0);
//   controls.update();

//   raycaster = new THREE.Raycaster();
//   mouse = new THREE.Vector2();

//   function onWindowResize() {
//     camera.aspect = container.offsetWidth / container.offsetHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(container.offsetWidth, container.offsetHeight);
//     labelRenderer.setSize(container.offsetWidth, container.offsetHeight);
//   }

//   window.addEventListener('resize', onWindowResize, true);

//   function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     labelRenderer.render(scene, camera);
//   }

//   animate();

//   loader.load('/resources/models/room.FBX', function (obj) {
//     scene.add(obj);

//     obj.scale.set(15, 15, 15);
//     obj.position.set(-2700, -400, 1300);
//     obj.rotation.set(-1, 0, 0);

//     camera.position.set(500, 3000, 3000);
//     camera.lookAt(obj);
//     controls.update();

//     makeHelper(obj);

//     object = obj;

//     callback(param);
//   });
// }

// const ThreeBox = {
//   props: [
//     'modelSrc',
//     'sensorList',
//     'infoModalId',
//     'addModalId',
//     'isHideBtnProp',
//   ],
//   template: `
//     <div>
//       <button
//         v-bind:class="{'d-none': isHideBtn}"
//         style="z-index: 2; width: 7rem; height: 2rem; position: absolute;"
//         v-on:click="openAddSensorModal"
//       >
//         등록하기
//       </button>
//       <div class="sensor-3d-icon-template" style="display: none;">
//         <i class="fas fa-wifi" v-on:click="openSensorInfoModal(sensor)"></i>
//       </div>
//     </div>
//   `,
//   data: function () {
//     return {
//       selectedPosition: {},
//       isHideBtn: this.isHideBtnProp,
//       labelList: [],
//       sensorPositionNullList: [],
//       // three obj
//     };
//   },
//   methods: {
//     getFaultlevelClass: function (l) {
//       switch (l) {
//         case 4:
//           return 'recovery';
//         case 3:
//           return 'minor';
//         case 2:
//           return 'major';
//         case 1:
//           return 'critical';
//       }
//     },
//     openSensorInfoModal: function (sensor) {
//       this.$emit('open:info', sensor);
//       $('#' + this.infoModalId).modal();
//       this.$emit('get:type', '3d');
//     },
//     openAddSensorModal: function () {
//       $('#' + this.addModalId).modal();
//       this.isHideBtn = true;
//       this.$emit(
//         'position',
//         this.selectedPosition.x +
//           '_' +
//           this.selectedPosition.y +
//           '_' +
//           this.selectedPosition.z,
//       );

//       this.$emit('get:type', '3d');
//     },
//     handleContextmenu: function (e) {
//       const point = getPointset(e, this.$el.parentElement);

//       if (point === null) {
//         this.isHideBtn = true;
//         return;
//       }

//       if (this.sensorPositionNullList.length === 0) return;

//       this.selectedPosition = point;
//       this.isHideBtn = false;
//       this.$el.querySelector('button').style.top = e.layerY + 'px';
//       this.$el.querySelector('button').style.left = e.layerX + 'px';
//     },
//   },
//   computed: {},
//   watch: {
//     isHideBtnProp: function (p) {
//       this.isHideBtn = p;
//     },
//     sensorList: function (n) {
//       const that = this;
//       that.labelList.forEach((l) => {
//         scene.remove(l);
//       });

//       that.labelList = [];

//       const notNullList = that.sensorList.filter((s) => s['3d'] !== null);
//       notNullList.forEach((r) => {
//         createLabel(this, r, function () {
//           that.openSensorInfoModal(r);
//         });
//       });
//     },
//   },
//   mounted: function () {
//     const parent = this.$el.parentElement;
//     initThree(
//       parent,
//       function ({ that }) {
//         const notNullList = that.sensorList.filter((s) => s['3d'] !== null);
//         const nullList = that.sensorList.filter((s) => s['3d'] === null);

//         notNullList.forEach((r) => {
//           createLabel(that, r, function () {
//             that.openSensorInfoModal(r);
//           });
//         });

//         that.sensorPositionNullList = nullList === undefined ? [] : nullList;
//       },
//       { that: this },
//     );

//     parent.addEventListener('click', this.handleContextmenu);

//     const that = this;
//     window.addEventListener('resize', function () {
//       that.isHideBtn = true;
//     });
//   },
// };
