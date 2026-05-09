import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/postprocessing/UnrealBloomPass.js';

import { carregarMesa } from './mesa.js';
import { carregarGiz } from './giz.js';
import { carregarCerveja, atualizarCerveja, servirCerveja } from './cerveja.js';
import { carregarCopo, encherCopo, esvaziarCopo } from './copo.js';
import { carregarLampada } from './lampada.js';
import { carregarBola, atualizarBola } from './bola.js';
import { carregarTaco } from './taco.js';
import { carregarPlaca } from './placa.js';

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
carregarGiz(scene);
carregarCerveja(scene);
carregarCopo(scene);
carregarLampada(scene);
carregarBola(scene);
carregarTaco(scene);
carregarPlaca(scene);

const textureLoader = new THREE.TextureLoader();
const colorB = textureLoader.load('./textures/bricks_color.jpg');
const normalB = textureLoader.load('./textures/bricks_normal.jpg');
const roughnessB = textureLoader.load('./textures/bricks_roughness.jpg');
colorB.colorSpace = THREE.SRGBColorSpace;

[colorB, normalB, roughnessB].forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 4);
});

const wallMaterial = new THREE.MeshStandardMaterial({
    map: colorB,
    normalMap: normalB,
    roughnessMap: roughnessB,
    color: 0x555555,
    roughness: 1.0
});

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
backWall.position.set(0, 7, -4);
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-7, 7, 0);
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), wallMaterial);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(7, 7, 0);
scene.add(rightWall);

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 10);
camera.lookAt(0, 0, 0);

const cameraCima = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraCima.position.set(0, 5.2, 0);
cameraCima.lookAt(0, 0, 0);

let cameraAtiva = camera;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, cameraAtiva);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85 
);
composer.addPass(bloomPass);

function setCameraFov(fov) {
    cameraAtiva.fov = fov;
    cameraAtiva.updateProjectionMatrix();
}

const cameraButton1 = document.getElementById('camera1');
const cameraButton2 = document.getElementById('camera2');

if (cameraButton1) {
    cameraButton1.addEventListener('click', () => {
        cameraAtiva = camera;
        renderPass.camera = cameraAtiva;
        setCameraFov(60);
    });
}

if (cameraButton2) {
    cameraButton2.addEventListener('click', () => {
        cameraAtiva = cameraCima;
        renderPass.camera = cameraAtiva;
        setCameraFov(60);
    });
}

setCameraFov(60);


const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    atualizarBola(delta);

    const estadoCerveja = atualizarCerveja(delta);
    if (estadoCerveja === 'parado') {
        servirCerveja();
    } else if (estadoCerveja === 'servindo') {
        encherCopo(delta);
    } else if (estadoCerveja === 'voltando') {
        esvaziarCopo(delta);
    }

    composer.render();
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    cameraCima.aspect = window.innerWidth / window.innerHeight;
    cameraCima.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});