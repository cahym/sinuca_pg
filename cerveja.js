import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

export function carregarCerveja(scene) {
    const loader = new GLTFLoader();
    loader.load(
        './models/beer_bottle.glb',
        (gltf) => {
            const cerveja = gltf.scene;
            cerveja.scale.set(0.2, 0.2, 0.2);
            cerveja.position.set(2, 0.35, 2.4);
            cerveja.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                }
            });
            scene.add(cerveja);
        },
        undefined,
        (error) => {
            console.error('Erro ao carregar cerveja:', error);
        }
    );
}