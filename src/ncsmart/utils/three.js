/*
var scene, camera, controls, selectedModel;
var modelList = {};
var labelList = [];
var container;
var renderer, light;

const loader = new THREE.FBXLoader();

function init() {
  container = document.getElementById('canvas');

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500000,
  );

  scene = new THREE.Scene();

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 200, 0);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 200, 100);
  light.castShadow = true;
  light.shadow.camera.top = 180;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -120;
  light.shadow.camera.right = 120;
  scene.add(light);

  var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);
  three;

  // model

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log(container);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, 0);
  controls.update();

  window.addEventListener('resize', onWindowResize, false);

  // loadModel(1, 1);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // var delta = clock.getDelta();
  // if ( mixer ) mixer.update( delta );
  // stats.update();
}

//export
loadModel = (skey, gkey) => {
  function defer(object) {
    camera.position.set(500, 3000, 3000);
    camera.lookAt(object);
    controls.update();

    selectedModel = object;
  }

  scene.remove(selectedModel);

  const key = skey + '_' + gkey;
  if (modelList[key] !== undefined) {
    scene.add(modelList[key]);
    defer(modelList[key]);
  } else {
    console.log(`/resources/models/${skey}_${gkey}.FBX`);
    const path = `/resources/models/${skey}_${gkey}.FBX`;
    loader.load(path, function (object) {
      scene.add(object);
      modelList[key] = object;

      object.scale.set(15, 15, 15);
      object.position.set(-2700, -400, 1300);
      object.rotation.set(-1, 0, 0);
      defer(object);
      createLabel(object);
    });
  }
};

function createLabel(model) {
  const cloneNode = document.querySelector('.sensor-icon-template').cloneNode();
  const label = new CSS2DObject(cloneNode);
  scene.add(label);
  model.add(label);
  lebelList.push(label);
}
*/
