import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { carregarMesa } from './mesa.js';
import { carregarLampada } from './lampada.js';
import { carregarBola, atualizarBola } from './bola.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x392620);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
scene.add(light);

carregarMesa(scene);

carregarLampada(scene);
carregarBola(scene);

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 4.5, 9);
camera.lookAt(0, 0, 0);

function setCameraFov(fov) {
  camera.fov = fov;
  camera.updateProjectionMatrix();
}

const cameraButton1 = document.getElementById('camera1');
const cameraButton2 = document.getElementById('camera2');
if (cameraButton1) cameraButton1.addEventListener('click', () => setCameraFov(60));
if (cameraButton2) cameraButton2.addEventListener('click', () => setCameraFov(25));

setCameraFov(60);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  atualizarBola(delta);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});