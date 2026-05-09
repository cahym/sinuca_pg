import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

let bola = null;
let bolaDirection = 1;
const bolaSpeed = 1.2;
const bolaRange = 2.0;
const bolaRotationMultiplier = -1;
let bolaRadius = 0.4;
const BallButton = document.getElementById('resetBola')

export function atualizarBola(delta) {
  if(BallButton){
    BallButton.addEventListener('click', () => {
      bola.position.set(-bolaRange, 0.25, 0);
      bolaDirection = 1;
    });
  }
  if (!bola) return;
  const displacement = bolaSpeed * bolaDirection * delta;
  bola.position.x += displacement;
  bola.rotation.z += (displacement / bolaRadius) * bolaRotationMultiplier;

  if (bola.position.x >= bolaRange) {
    bola.position.x = bolaRange;
    bolaDirection = -0;
  }
}

export function carregarBola(scene) {
  const vertexShader = `
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat3 normalMatrix;
    attribute vec3 position;
    attribute vec3 normal;
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    varying vec3 vNormal;
    uniform vec3 uColor;
    void main() {
      vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
      float lightIntensity = max(dot(vNormal, lightDirection), 0.2);
      gl_FragColor = vec4(uColor * lightIntensity, 1.0);
    }
  `;

  const loader = new GLTFLoader();

  loader.load('./models/eight_ball.glb', (gltf) => {
    const bolaMesh = gltf.scene;
    const bolaContainer = new THREE.Object3D();

    bolaMesh.scale.set(0.08, 0.08, 0.08);
    const box = new THREE.Box3().setFromObject(bolaMesh);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    bolaRadius = sphere.radius;

    const center = box.getCenter(new THREE.Vector3());
    bolaMesh.position.sub(center);

    bolaContainer.position.set(-bolaRange, 0.25, 0);
    bolaContainer.add(bolaMesh);
    bola = bolaContainer;

    bolaMesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const originalMaterial = child.material;
        const materialOptions = {
          roughness: 0.4,
          metalness: 0.1,
          color: new THREE.Color(0x111111)
        };

        if (originalMaterial && originalMaterial.color) {
          materialOptions.color = originalMaterial.color.clone();
        }
        if (originalMaterial && originalMaterial.map) {
          materialOptions.map = originalMaterial.map;
        }
        if (originalMaterial && originalMaterial.normalMap) {
          materialOptions.normalMap = originalMaterial.normalMap;
        }

        child.material = new THREE.MeshStandardMaterial(materialOptions);
      }
    });

    scene.add(bola);
  });
}
